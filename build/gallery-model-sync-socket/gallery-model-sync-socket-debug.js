YUI.add('gallery-model-sync-socket', function(Y) {

/**
An extension which provides a sync implementation using Socket.IO as the
transport method, which can be mixed into a Model or ModelList subclass.

@module gallery-model-sync-socket
**/

/**
An extension which provides a sync implementation using Socket.IO as the
transport method, which can be mixed into a Model or ModelList subclass.

This makes it trivial for your Model or ModelList subclasses to communicate
and transmit JSON data via WebSockets, falling back to Flash sockets, long
polling, or other available real-time transport methods if not supported.

Currently based on Jake Luer's (@logicalparadox/jakeluer) backbone.iobind though
this will likely change in the future to take better advantage of YUI's custom
event system.

In most cases, you'll only need to provide a value for 'root' when sub-classing
Model, and only provide a value for 'url' when sub-classing ModelList.

    var User = Y.Base.create('user', Y.Model, [Y.ModelSync.Socket], {
        root: '/users'
    });

    var Users = Y.Base.create('users', Y.ModelList, [Y.ModelSync.Socket], {
        model: User,
        url  : '/users'
    });

@class ModelSync.Socket
@extensionfor Model
@extensionfor ModelList
**/

var Lang = Y.Lang,

    sub        = Lang.sub,
    isValue    = Lang.isValue,
    isString   = Lang.isString,
    isNumber   = Lang.isNumber,
    isFunction = Lang.isFunction;

// -- SocketSync --------------------------------------------------------------

function SocketSync() {}

/**
Properties that shouldn't be turned into ad-hoc attributes when passed to a
Model or ModelList constructor.

@property _NON_ATTRS_CFG
@type Array
@default ['root', 'url']
@static
@protected
**/

SocketSync._NON_ATTRS_CFG = ['root', 'url'];

SocketSync.prototype = {

    // -- Public Properties ----------------------------------------------------
    
    /**
    A String which represents the root or collection part of the Socket.IO 
    event which relates to a Model or ModelList. Usually this value should
    be the same for all instances of a specific Model/ModelList type.

    When sub-classing Y.Model, most of the time you'll want to override
    this property, and the let the namespaces for the events be generated by
    convention. To make it simpler for transition between ModelSync.REST and
    ModelSync.Socket, these properties for ModelSync.Socket can have beginning 
    or ending slashes in them, which will be taken care of by the parser.

    When sub-classing Y.ModelList, usually you'll want to ignore configuring the
    `root` and instead just set the `url` to a String; but if you just specify a
    value for `root`, things will work correctly.

    @property root
    @type String
    @default ""
    **/

    root: '',

    /**
    A Function or String which is used to generate or specify the global events
    that are listened to by Socket.IO. While this property can be defined for
    each Model/ModelList instance, usually you'll want to use a Function or a
    String-pattern instead.

    If the `url` property is a Function, it should return the String that should
    be used as the URL. The Function will be called before each request and will
    be passed the sync `action` which is currently being performed.

    If the `url` property is a String, it will be processed by `Y.Lang.sub()`;
    This is useful when the Socket.IO events for a Model type match a specific
    pattern and can use simple replacement tokens:

    @example
        'users/{id}'

    By default, our ModelSync.Socket implementation will cause our `user` Models
    to listen for the following Socket.IO events on the client:

    @example
        'users/{id}:construct',
        'users/{id}:read',
        'users/{id}:update',
        'users/{id}:delete'

    And our ModelLists will be listening for the following Socket.IO event:

    @example
        'users:read',
    **/
        
    url: function () {
        var root = this.root,
            url;

        if (this._isYUIModelList || this.isNew()) {
            return root;
        }

        url = this.getAsURL('id');

        if (root && root.charAt(root.length - 1) === '/') {
            url += '/';
        }

        return this._joinURL(url);
    },

    initializer: function (config) {
        config || (config = {});
        isValue(config.url) && (this.url = config.url);
    },

    /**
    Binds Socket.IO messages to handlers in your Models and Model Lists

    @method onSocket
    @param {String} [type] Sync operation type
    @param {Object} [io] (optional) Socket.IO connection
    @param {Function} [callback] Callback to be executed on response
    @param {Object} [context] (optional) `this` context

    @example
      
    // Client-side handling
        model.onSocket('update', function (e) {
            this.setAttrs(e.data);
        });

    // Server-side handling
        socket.on('model:update', function (data, callback) {
            socket.emit('model/' + data.id + ':update', {data, data});
        });
    **/
    onSocket: function (type, io, callback, context) {
        var ioEvents = this._ioEvents || (this._ioEvents = {}),
            globalType = this._getURL() + ':' + type,
            self = this;

        if (isFunction(io)) {
           context = callback;
           callback = io;
           io = window.socket || this.socket;
        }

        var event = {
            type: type,
            global: globalType,
            localCallback: callback,
            globalCallback: function (data) {
                self.fire(type, data);
            }
        };

        this.on(event.type, event.localCallback, (context || self));
        io.on(event.global, event.globalCallback);
        
        if (!ioEvents[event.name]) {
            ioEvents[event.name] = [event];
        } else {
            ioEvents[event.name].push(event);
        }
        return this;
    },

    /**
    Removes handlers that are bound to the specified Socket.IO event,
    or a specific callback for that event.

    @method detachSocket
    @param {String} [type] Sync operation type
    @param {Object} [io] (optional) Socket.IO connection
    @param {Function} [callback] Specific callback handler to remove
    **/

    detachSocket: function (type, io, callback) {
        var ioEvents = this._ioEvents || (this._ioEvents = {}),
            globalType = this._getURL() + ':' + type,
            self = this;

        if (isFunction(io)) {
            callback = io;
            io = this.socket || window.socket || Y.socket;
        }

        var events = ioEvents[type];
        if (Y.isEmpty(events)) {
            if (callback && isFunction(callback)) {
                for (var i = 0, len = events.length; i < len; i++) {
                    if (callback == events[i].localCallback) {
                        this.detach(events[i].type, events[i].localCallback);
                        io.removeListener(events[i].global, events[i].globalCallback);
                        events[i] = false;
                    }
                }
                events = Y.Array.filter(events);
            } else {
                this.detach(type);
                io.removeAllListeners(globalType);
            }
            if (events.length === 0) {
                delete ioEvents[type];
            }
        }
        return this;
    },

    /**
    Detaches all handlers that are bound to a specific Socket.IO connection.

    @method detachAllSockets
    @param {Object} [io] The Socket.IO connection to be detached
    **/

    detachAllSockets: function (io) {
        var ioEvents = this._ioEvents || (this._ioEvents = {});
        if (!io) {
            io = this.socket || window.socket || Y.socket;
        }
        for (var socket in ioEvents) {
            this.detachSocket(socket, io);
        }
        return this;
    },

    /**
    Communicates with an external Socket.IO server that sends and receives
    data through JSON-based messages.

    This method is called internally by load(), save(), and destroy().

    @method sync
    @param {String} [action] Sync action to perform; is one of the following:

      * **create**: Store a newly-created model for the first time.
      * **read**  : Load an existing model.
      * **update**: Update an existing model.
      * **delete**: Delete an existing model.
 
    @options {Object} [options] Optional data to be mixed in with params 
      serialized and set through Socket.IO
    @param {callback} [callback] Called when the sync operation finishes.
      @param {Error|null} callback.err If an error occurred, this parameter will
        contain the error. If the sync operation succeeded, _err_ will be
        falsy.
      @param {Any} [callback.response] The server's response. This value will
        be passed to the parse() method, which is expected to parse it and
        return an attribute hash.
    **/ 
    
    sync: function (action, options, callback) {
        var cmd = this._getURL().split('/'),
            // ignore leading slash
            namespace = (cmd[0] !== '') ? cmd[0] : cmd[1];

        // get past ModelList's own 'create' event
        action = (action === 'create') ? 'construct' : action;

        var params = Y.mix(options, {
            req: namespace + ':' + action
        });

        if (!params.data) {
            params.data = this.toJSON() || {};
        }

        var io = window.socket || Y.socket;

        io.emit(namespace + ':' + action, params.data, function (err, data) {
            if (err) {
                callback(err);
            } else {
                callback(null, data);
            }
        });
    },

    // -- Protected Methods ---------------------------------------------------

    /**
    Helper method to return the used URL when making the request to the server.

    This method correctly handles variations of the `url` property/method.

    @method _getURL
    @param {String} action Sync action to perform.
    @return {String} the URL for the XHR.
    @protected
    **/

    _getURL: function () {
        var url = this.url;

        if (isFunction(url)) {
            return this.url();
        }

        if (url.charAt(0) === '/') {
            url = url.substring(1);
        }

        if (this._isYUIModel) {
            data = {};

            Y.Object.each(this.toJSON(), function (v, k) {
                if (isString(v) || isNumber(v)) {
                    // URL-encode any String or Number values.
                    data[k] = encodeURIComponent(v);
                }
            });

            // Substitute placeholders with the URL-encoded data values.
            url = sub(url, data);
        } 

        return url || this.root;
    },

    /**
    Joins the `root` URL to the specified _url_, normalizing leading/trailing
    `/` characters.

    Modified from YUI 3's `Y.Router` Class: by Ryan Grove (Yahoo! Inc.)
    http://yuilibrary.com/yui/docs/api/classes/Router.html#method__joinURL

    @example
        model.root = '/foo'
        model._joinURL('bar');  // => 'foo/bar'
        model._joinURL('/bar'); // => 'foo/bar'

        model.root = '/foo/'
        model._joinURL('bar');  // => 'foo/bar'
        model._joinURL('/bar'); // => 'foo/bar'

    @method _joinURL
    @param {String} [url] URL to append to the `root` URL.
    @return {String} Joined URL.
    @protected
    **/

    _joinURL: function (url) {
        var root = this.root;

        if (url.charAt(0) === '/') {
            url = url.substring(1);
        }

        if (root.charAt(0) === '/') {
            root = root.substring(1);
        }

        return root && root.charAt(root.length - 1) === '/' ?
                root + url :
                root + '/' + url;
    }
};

// -- Namespace ---------------------------------------------------------------

Y.namespace('ModelSync').Socket = SocketSync;


}, 'gallery-2012.07.11-21-38' ,{requires:['model', 'model-list', 'json-stringify'], skinnable:false});
