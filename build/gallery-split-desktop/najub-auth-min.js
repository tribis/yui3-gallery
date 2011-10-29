YUI.add('gallery-progressbar', function(Y) {

   var LANG = Y.Lang,NAME = 'progressBar';
    
    Y.ProgressBar = Y.Base.create('progressBar', Y.Widget, [], {

        _anim: null,


        /** set up **/
        renderUI: function() {
            Y.log('renderUI', 'info', NAME);
            this.get('contentBox').append(LANG.sub(this.get('layout'), {
                sliderClass: this.getClassName('slider'),
                wrapperClass: this.getClassName('slider','wrapper'),
                labelClass: this.getClassName('label')
            }));
        },

        bindUI: function() {
            Y.log('bindUI', 'info', NAME);
            this.after('labelChange', this._updateLabel);
            this.after('labelTemplateChange', this._updateLabel);
            this.after('progressChange', this._updateBar);
        },

        syncUI: function() {
            Y.log('syncUI', 'info', NAME);
            this._updateBar();
        },

        /** A little bit of sugar **/
        increment: function(step) {
            Y.log('increment', 'info', NAME);
            step = step || 1;
            this.set('progress', this.get('progress') + parseFloat(step, 10));
            return this;
        },

        decrement: function(step) {
            Y.log('decrement', 'info', NAME);
            step = step || 1;
            this.set('progress', this.get('progress') - parseFloat(step, 10));
            return this;
        },

        update: function(progress) {
            Y.log('update', 'info', NAME);
            this.set('progress', progress);
            return this;
        },

        setLabelAt: function(position, value) {
            Y.log('setLabelAt', 'info', NAME);
            var label = this.get('label');
            position = parseFloat(position, 10);
            label[position] = value;
            this.set('label', label);
            return this;
        },

        removeLabelAt: function(position) {
            Y.log('removeLabelAt', 'info', NAME);
            var label = this.get('label');
            position = parseFloat(position, 10);
            if (label[position] !== undefined && label[position] !== null) {
                delete label[position];
            }
            this.set('label', label);
            return this;
        },

        setLabelTemplateAt: function(position, value) {
            Y.log('setLabelTemplateAt', 'info', NAME);
            var template = this.get('labelTemplate');
            position = parseFloat(position, 10);
            template[position] = value;
            this.set('labelTemplate', template);
            return this;
        },

        removeLabelTemplateAt: function(position) {
            Y.log('removeLabelTemplateAt', 'info', NAME);
            var template = this.get('labelTemplate');
            position = parseFloat(position, 10);
            if (template[position] !== undefined && template[position] !== null) {
                delete template[position];
            }
            this.set('labelTemplate', template);
            return this;
        },

        /** protected updaters **/
        _updateLabel: function(e) {
            Y.log('_updateLabel', 'info', NAME);
            var progress = this.get('progress'),
                attrs = this.getAttrs(),
                label = this._getLabel(progress),
                labelTemplate = this._getLabelTemplate(progress);
                
            attrs.label = label || '';
            this.get('contentBox').all('.' + this.getClassName('label')).set('text', LANG.sub(labelTemplate, attrs));
        },

        _updateBar: function(e) {
            Y.log('_updateBar', 'info', NAME);
            var cb = this.get('contentBox'),
                position = cb.get('offsetWidth') * this.get('progress') / 100;

            if (!this._anim) {
                this._makeAnim();
            }

            if (this._anim && this._anim.get('running')) {
                this._anim.stop();
            }
            
            this._anim.set('to.width', position);
            
            this._anim.run();

            this._updateLabel();
        },

        _makeAnim: function() {
            Y.log('_makeAnim', 'info', NAME);
            var animConfig = this.get('animation'),
                node = this.get('contentBox').one(this.get('animateNode'));

            animConfig.node = node;

            if (!animConfig.to) {
                animConfig.to = {
                    width: 0
                };
            }
            
            this._anim = new Y.Anim(animConfig);
        },

        _getAnimateNode: function() {
            return ('.' + this.getClassName('slider'));
        },
        
        _getLabel : function(progress) {
            Y.log('_getLabel', 'info', NAME);
            var label = this.get('label'),
                labelString = null,
                keys, i = -1, l;
                
            if ( !LANG.isObject(label) ) {
                return label; 
            }

            if (label[progress] !== undefined && label[progress] !== null) {
                labelString = label[progress];
            } else {
                keys = Y.Object.keys(label);
                keys.sort(Y.Array.numericSort);
                l = keys.length;
                while (++i < l) {
                    if (keys[i] <= progress) {
                        labelString = label[keys[i]];
                    }
                }
            }
            
            return labelString;
        },
        
        _getLabelTemplate : function(progress) {
            Y.log('_getLabelTemplate', 'info', NAME);
            var template = this.get('labelTemplate'),
                templateString = null,
                keys, i = -1, l;
            
            if ( !LANG.isObject(template) ) {
                return template;
            }
            
            if (template[progress] !== undefined && template[progress] !== null) {
                templateString = template[progress];
            } else {
                keys = Y.Object.keys(template);
                keys.sort(Y.Array.numericSort);
                l = keys.length;
                while (++i < l) {
                    if (keys[i] <= progress) {
                        templateString = template[keys[i]];
                    }
                }
            }
            
            return templateString;
        }

    }, {
        ATTRS: {

            animation: {
                value: {
                    easing: Y.Easing.easeIn,
                    duration: 0.5
                }
            },

            animateNode: {
                valueFn: '_getAnimateNode'
            },

/* REMOVED FOR TRANSITION BUG
    transition : {
      value : {
        easing : 'ease-out',
        duration: 0.5
      }
    },
    */

            labelTemplate: {
                value: { 0 : '{label} - {progress}%' },
                validator: function(val) {
                    return (LANG.isString(val) || LANG.isObject(val));
                },
                setter: function(val) {
                    if (LANG.isString(val)) {
                        val = {
                            0: val
                        };
                    }
                    return val;
                }
            },

            label: {
                value: {
                    0: 'Loading',
                    100: 'Complete'
                },
                validator: function(val) {
                    return (LANG.isString(val) || LANG.isObject(val));
                },
                setter: function(val) {
                    if (LANG.isString(val)) {
                        val = {
                            0: val
                        };
                    }
                    return val;
                }
            },

            layout: {
                value: '<div class="{sliderClass} {labelClass}"></div>'
            },

            precision: {
                value: 2,
                setter: function(val) {
                    return parseInt(val, 10);
                }
            },

            progress: {
                value: 0,
                setter: function(val) {
                    var precision = Math.pow(10, this.get('precision'));
                    val = parseFloat(val, 10);
                    if (val < 0) {
                        val = 0;
                    } else if (val > 100) {
                        val = 100;
                    }
                    return Math.round(val * precision) / precision;
                }
            }
        }
    });
}, 'gallery-2010.06.30-19-54' ,{requires:['widget','substitute', 'anim-base','anim-easing']});/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("swfdetect",function(c){var k=0,i=c.UA,f=c.Lang,n="ShockwaveFlash",b,h,d,o,a;function m(e){return parseInt(e,10);}function g(e){if(f.isNumber(m(e[0]))){i.flashMajor=e[0];}if(f.isNumber(m(e[1]))){i.flashMinor=e[1];}if(f.isNumber(m(e[2]))){i.flashRev=e[2];}}if(i.gecko||i.webkit||i.opera){if((b=navigator.mimeTypes["application/x-shockwave-flash"])){if((h=b.enabledPlugin)){d=h.description.replace(/\s[rd]/g,".").replace(/[A-Za-z\s]+/g,"").split(".");g(d);}}}else{if(i.ie){try{o=new ActiveXObject(n+"."+n+".6");o.AllowScriptAccess="always";}catch(j){if(o!==null){k=6;}}if(k===0){try{a=new ActiveXObject(n+"."+n);d=a.GetVariable("$version").replace(/[A-Za-z\s]+/g,"").split(",");g(d);}catch(l){}}}}c.SWFDetect={getFlashVersion:function(){return(String(i.flashMajor)+"."+String(i.flashMinor)+"."+String(i.flashRev));},isFlashVersionAtLeast:function(r,t,s){var p=m(i.flashMajor),q=m(i.flashMinor),e=m(i.flashRev);r=m(r||0);t=m(t||0);s=m(s||0);if(r===p){if(t===q){return s<=e;}return t<q;}return r<p;}};},"3.4.1",{requires:["yui-base"]});/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("escape",function(c){var a={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;","`":"&#x60;"},b={html:function(d){return(d+"").replace(/[&<>"'\/`]/g,b._htmlReplacer);},regex:function(d){return(d+"").replace(/[\-#$\^*()+\[\]{}|\\,.?\s]/g,"\\$&");},_htmlReplacer:function(d){return a[d];}};b.regexp=b.regex;c.Escape=b;},"3.4.1",{requires:["yui-base"]});/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("swf",function(b){var m=b.Event,g=b.SWFDetect,i=b.Lang,h=b.UA,j=b.Node,n=b.Escape,f="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",e="application/x-shockwave-flash",d="10.0.22",a="http://fpdownload.macromedia.com/pub/flashplayer/update/current/swf/autoUpdater.swf?"+Math.random(),c="SWF.eventHandler",k={align:"",allowFullScreen:"",allowNetworking:"",allowScriptAccess:"",base:"",bgcolor:"",menu:"",name:"",quality:"",salign:"",scale:"",tabindex:"",wmode:""};function l(s,p,E){this._id=b.guid("yuiswf");var t=this._id;var y=j.one(s);var H=E["version"]||d;var B=(H+"").split(".");var u=g.isFlashVersionAtLeast(parseInt(B[0]),parseInt(B[1]),parseInt(B[2]));var A=(g.isFlashVersionAtLeast(8,0,0));var r=A&&!u&&E["useExpressInstall"];var q=(r)?a:p;var G="<object ";var v,D;var F="yId="+b.id+"&YUISwfId="+t+"&YUIBridgeCallback="+c+"&allowedDomain="+document.location.hostname;b.SWF._instances[t]=this;if(y&&(u||r)&&q){G+='id="'+t+'" ';if(h.ie){G+='classid="'+f+'" ';}else{G+='type="'+e+'" data="'+n.html(q)+'" ';}v="100%";D="100%";G+='width="'+v+'" height="'+D+'">';if(h.ie){G+='<param name="movie" value="'+n.html(q)+'"/>';}for(var x in E.fixedAttributes){if(k.hasOwnProperty(x)){G+='<param name="'+n.html(x)+'" value="'+n.html(E.fixedAttributes[x])+'"/>';}}for(var z in E.flashVars){var o=E.flashVars[z];if(i.isString(o)){F+="&"+n.html(z)+"="+n.html(encodeURIComponent(o));}}if(F){G+='<param name="flashVars" value="'+F+'"/>';}G+="</object>";y.setContent(G);this._swf=j.one("#"+t);}else{var C={};C.type="wrongflashversion";this.publish("wrongflashversion",{fireOnce:true});this.fire("wrongflashversion",C);}}l._instances=l._instances||{};l.eventHandler=function(o,p){l._instances[o]._eventHandler(p);};l.prototype={_eventHandler:function(o){if(o.type==="swfReady"){this.publish("swfReady",{fireOnce:true});this.fire("swfReady",o);}else{if(o.type==="log"){}else{this.fire(o.type,o);}}},callSWF:function(p,o){if(!o){o=[];}if(this._swf._node[p]){return(this._swf._node[p].apply(this._swf._node,o));}else{return null;}},toString:function(){return"SWF "+this._id;}};b.augment(l,b.EventTarget);b.SWF=l;},"3.4.1",{requires:["event-custom","node","swfdetect","escape"]});/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("uploader",function(e){var b=e.Event,c=e.Node;var a=e.Env.cdn+"uploader/assets/uploader.swf";function d(f){d.superclass.constructor.apply(this,arguments);if(f.hasOwnProperty("boundingBox")){this.set("boundingBox",f.boundingBox);}if(f.hasOwnProperty("buttonSkin")){this.set("buttonSkin",f.buttonSkin);}if(f.hasOwnProperty("transparent")){this.set("transparent",f.transparent);}if(f.hasOwnProperty("swfURL")){this.set("swfURL",f.swfURL);}}e.extend(d,e.Base,{uploaderswf:null,_id:"",initializer:function(){this._id=e.guid("uploader");var f=c.one(this.get("boundingBox"));var i={version:"10.0.45",fixedAttributes:{allowScriptAccess:"always",allowNetworking:"all",scale:"noscale"},flashVars:{}};if(this.get("buttonSkin")!=""){i.flashVars["buttonSkin"]=this.get("buttonSkin");}if(this.get("transparent")){i.fixedAttributes["wmode"]="transparent";}this.uploaderswf=new e.SWF(f,this.get("swfURL"),i);var h=this.uploaderswf;var g=e.bind(this._relayEvent,this);h.on("swfReady",e.bind(this._initializeUploader,this));h.on("click",g);h.on("fileselect",g);h.on("mousedown",g);h.on("mouseup",g);h.on("mouseleave",g);h.on("mouseenter",g);h.on("uploadcancel",g);h.on("uploadcomplete",g);h.on("uploadcompletedata",g);h.on("uploaderror",g);h.on("uploadprogress",g);h.on("uploadstart",g);},removeFile:function(f){return this.uploaderswf.callSWF("removeFile",[f]);},clearFileList:function(){return this.uploaderswf.callSWF("clearFileList",[]);},upload:function(f,h,j,g,i){if(e.Lang.isArray(f)){return this.uploaderswf.callSWF("uploadThese",[f,h,j,g,i]);}else{if(e.Lang.isString(f)){return this.uploaderswf.callSWF("upload",[f,h,j,g,i]);}}},uploadThese:function(h,g,j,f,i){return this.uploaderswf.callSWF("uploadThese",[h,g,j,f,i]);},uploadAll:function(g,i,f,h){return this.uploaderswf.callSWF("uploadAll",[g,i,f,h]);},cancel:function(f){return this.uploaderswf.callSWF("cancel",[f]);},setAllowLogging:function(f){this.uploaderswf.callSWF("setAllowLogging",[f]);},setAllowMultipleFiles:function(f){this.uploaderswf.callSWF("setAllowMultipleFiles",[f]);},setSimUploadLimit:function(f){this.uploaderswf.callSWF("setSimUploadLimit",[f]);},setFileFilters:function(f){this.uploaderswf.callSWF("setFileFilters",[f]);},enable:function(){this.uploaderswf.callSWF("enable");},disable:function(){this.uploaderswf.callSWF("disable");},_initializeUploader:function(f){this.publish("uploaderReady",{fireOnce:true});this.fire("uploaderReady",{});},_relayEvent:function(f){this.fire(f.type,f);},toString:function(){return"Uploader "+this._id;}},{ATTRS:{log:{value:false,setter:"setAllowLogging"},multiFiles:{value:false,setter:"setAllowMultipleFiles"},simLimit:{value:2,setter:"setSimUploadLimit"},fileFilters:{value:[],setter:"setFileFilters"},boundingBox:{value:null,writeOnce:"initOnly"},buttonSkin:{value:null,writeOnce:"initOnly"},transparent:{value:true,writeOnce:"initOnly"},swfURL:{value:a,writeOnce:"initOnly"}}});e.Uploader=d;},"3.4.1",{requires:["swf","base","node","event-custom"]});/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("transition",function(b){var i="",h="",f=b.config.doc,r="documentElement",s="transition",k="Transition",m,j,p,a,n,c,l,t,q={},g=["Webkit","Moz"],e={Webkit:"webkitTransitionEnd"},d=function(){this.init.apply(this,arguments);};d._toCamel=function(u){u=u.replace(/-([a-z])/gi,function(w,v){return v.toUpperCase();});return u;};d._toHyphen=function(u){u=u.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g,function(y,x,w,v){var z=((x)?"-"+x.toLowerCase():"")+w;if(v){z+="-"+v.toLowerCase();}return z;});return u;};d.SHOW_TRANSITION="fadeIn";d.HIDE_TRANSITION="fadeOut";d.useNative=false;b.Array.each(g,function(v){var u=v+k;if(u in f[r].style){i=v;h=d._toHyphen(v)+"-";d.useNative=true;d.supported=true;d._VENDOR_PREFIX=v;}});k=i+k;m=i+"TransitionProperty";j=h+"transition-property";p=h+"transition-duration";a=h+"transition-timing-function";n=h+"transition-delay";c="transitionend";l="on"+i.toLowerCase()+"transitionend";c=e[i]||c;t=i+"Transform";d.fx={};d.toggles={};d._hasEnd={};d._reKeywords=/^(?:node|duration|iterations|easing|delay|on|onstart|onend)$/i;b.Node.DOM_EVENTS[c]=1;d.NAME="transition";d.DEFAULT_EASING="ease";d.DEFAULT_DURATION=0.5;d.DEFAULT_DELAY=0;d._nodeAttrs={};d.prototype={constructor:d,init:function(v,u){var w=this;w._node=v;if(!w._running&&u){w._config=u;v._transition=w;w._duration=("duration" in u)?u.duration:w.constructor.DEFAULT_DURATION;w._delay=("delay" in u)?u.delay:w.constructor.DEFAULT_DELAY;w._easing=u.easing||w.constructor.DEFAULT_EASING;w._count=0;w._running=false;}return w;},addProperty:function(v,x){var A=this,y=this._node,C=b.stamp(y),B=b.one(y),F=d._nodeAttrs[C],z,E,u,D,w;if(!F){F=d._nodeAttrs[C]={};}D=F[v];if(x&&x.value!==undefined){w=x.value;}else{if(x!==undefined){w=x;x=q;}}if(typeof w==="function"){w=w.call(B,B);}if(D&&D.transition){if(D.transition!==A){D.transition._count--;}}A._count++;u=((typeof x.duration!="undefined")?x.duration:A._duration)||0.0001;F[v]={value:w,duration:u,delay:(typeof x.delay!="undefined")?x.delay:A._delay,easing:x.easing||A._easing,transition:A};z=b.DOM.getComputedStyle(y,v);E=(typeof w==="string")?z:parseFloat(z);if(d.useNative&&E===w){setTimeout(function(){A._onNativeEnd.call(y,{propertyName:v,elapsedTime:u});},u*1000);}},removeProperty:function(w){var v=this,u=d._nodeAttrs[b.stamp(v._node)];if(u&&u[w]){delete u[w];v._count--;}},initAttrs:function(v){var u,w=this._node;if(v.transform&&!v[t]){v[t]=v.transform;delete v.transform;}for(u in v){if(v.hasOwnProperty(u)&&!d._reKeywords.test(u)){this.addProperty(u,v[u]);if(w.style[u]===""){b.DOM.setStyle(w,u,b.DOM.getComputedStyle(w,u));}}}},run:function(y){var x=this,v=x._node,u=x._config,w={type:"transition:start",config:u};if(!x._running){x._running=true;if(u.on&&u.on.start){u.on.start.call(b.one(v),w);}x.initAttrs(x._config);x._callback=y;x._start();}return x;},_start:function(){this._runNative();},_prepDur:function(u){u=parseFloat(u);return u+"s";},_runNative:function(w){var C=this,x=C._node,E=b.stamp(x),v=x.style,A=getComputedStyle(x),I=d._nodeAttrs[E],y="",J=A[d._toCamel(j)],H=j+": ",B=p+": ",G=a+": ",D=n+": ",z,F,u;if(J!=="all"){H+=J+",";B+=A[d._toCamel(p)]+",";G+=A[d._toCamel(a)]+",";D+=A[d._toCamel(n)]+",";}for(u in I){z=d._toHyphen(u);F=I[u];if((F=I[u])&&F.transition===C){if(u in x.style){B+=C._prepDur(F.duration)+",";D+=C._prepDur(F.delay)+",";G+=(F.easing)+",";H+=z+",";y+=z+": "+F.value+"; ";}else{this.removeProperty(u);}}}H=H.replace(/,$/,";");B=B.replace(/,$/,";");G=G.replace(/,$/,";");D=D.replace(/,$/,";");if(!d._hasEnd[E]){x.addEventListener(c,C._onNativeEnd,"");d._hasEnd[E]=true;}v.cssText+=H+B+G+D+y;},_end:function(u){var y=this,w=y._node,A=y._callback,v=y._config,x={type:"transition:end",config:v,elapsedTime:u},z=b.one(w);y._running=false;y._callback=null;if(w){if(v.on&&v.on.end){setTimeout(function(){v.on.end.call(z,x);if(A){A.call(z,x);}},1);}else{if(A){setTimeout(function(){A.call(z,x);},1);}}}},_endNative:function(u){var v=this._node,w=v.ownerDocument.defaultView.getComputedStyle(v,"")[d._toCamel(j)];if(typeof w==="string"){w=w.replace(new RegExp("(?:^|,\\s)"+u+",?"),",");w=w.replace(/^,|,$/,"");v.style[k]=w;}},_onNativeEnd:function(B){var x=this,A=b.stamp(x),u=B,v=d._toCamel(u.propertyName),E=u.elapsedTime,D=d._nodeAttrs[A],C=D[v],y=(C)?C.transition:null,z,w;if(y){y.removeProperty(v);y._endNative(v);w=y._config[v];z={type:"propertyEnd",propertyName:v,elapsedTime:E,config:w};if(w&&w.on&&w.on.end){w.on.end.call(b.one(x),z);}if(y._count<=0){y._end(E);}}},destroy:function(){var v=this,u=v._node;if(u){u.removeEventListener(c,v._onNativeEnd,false);v._node=null;}}};b.Transition=d;b.TransitionNative=d;b.Node.prototype.transition=function(w,v,A){var u=d._nodeAttrs[b.stamp(this._node)],y=(u)?u.transition||null:null,x,z;if(typeof w==="string"){if(typeof v==="function"){A=v;v=null;}x=d.fx[w];if(v&&typeof v!=="boolean"){v=b.clone(v);for(z in x){if(x.hasOwnProperty(z)){if(!(z in v)){v[z]=x[z];}}}}else{v=x;}}else{A=v;v=w;}if(y&&!y._running){y.init(this,v);}else{y=new d(this._node,v);}y.run(A);return this;};b.Node.prototype.show=function(v,u,w){this._show();if(v&&b.Transition){if(typeof v!=="string"&&!v.push){if(typeof u==="function"){w=u;u=v;}v=d.SHOW_TRANSITION;}this.transition(v,u,w);}return this;};var o=function(v,u,w){return function(){if(u){u.call(v);}if(w){w.apply(v._node,arguments);}};};b.Node.prototype.hide=function(v,u,w){if(v&&b.Transition){if(typeof u==="function"){w=u;u=null;}w=o(this,this._hide,w);if(typeof v!=="string"&&!v.push){if(typeof u==="function"){w=u;u=v;}v=d.HIDE_TRANSITION;}this.transition(v,u,w);}else{this._hide();}return this;};b.NodeList.prototype.transition=function(v,y){var u=this._nodes,w=0,x;while((x=u[w++])){b.one(x).transition(v,y);}return this;};b.Node.prototype.toggleView=function(v,u,w){this._toggles=this._toggles||[];w=arguments[arguments.length-1];if(typeof v=="boolean"){u=v;v=null;}v=v||b.Transition.DEFAULT_TOGGLE;if(typeof u=="undefined"&&v in this._toggles){u=!this._toggles[v];}u=(u)?1:0;if(u){this._show();}else{w=o(this,this._hide,w);}this._toggles[v]=u;
this.transition(b.Transition.toggles[v][u],w);return this;};b.NodeList.prototype.toggleView=function(w,u,z){var v=this._nodes,x=0,y;while((y=v[x++])){b.one(y).toggleView(w,u,z);}return this;};b.mix(d.fx,{fadeOut:{opacity:0,duration:0.5,easing:"ease-out"},fadeIn:{opacity:1,duration:0.5,easing:"ease-in"},sizeOut:{height:0,width:0,duration:0.75,easing:"ease-out"},sizeIn:{height:function(u){return u.get("scrollHeight")+"px";},width:function(u){return u.get("scrollWidth")+"px";},duration:0.5,easing:"ease-in",on:{start:function(){var u=this.getStyle("overflow");if(u!=="hidden"){this.setStyle("overflow","hidden");this._transitionOverflow=u;}},end:function(){if(this._transitionOverflow){this.setStyle("overflow",this._transitionOverflow);delete this._transitionOverflow;}}}}});b.mix(d.toggles,{size:["sizeOut","sizeIn"],fade:["fadeOut","fadeIn"]});d.DEFAULT_TOGGLE="fade";},"3.4.1",{requires:["node-style"]});YUI.add('ckf-shim', function(Y) {

// START WRAPPER: The YUI.add wrapper is added by the build system, when you use YUI Builder to build your component from the raw source in this file
// YUI.add("mywidget", function(Y) {

	/* Any frequently used shortcuts, strings and constants */
	var Node = Y.Node,
		POUND = "#",
		SHIM_ID = 'uploaderShim',
		SHIM_COLUMN_ID = 'shimColumn',
		SHIM_SPACER_ID = 'shimSpacer',
		SHIM_TABLE_ID = 'shimTable',
		SHIM_RESIZER_ID = 'shimResizer',
		SHIM_MARGIN_COLOR = '#D3D3D3',
		SELECT_BUTT_ID = 'selectButton',
		PROGRESS_BAR_CONTAINER_ID = 'files',
		PROGRESS_BAR_BODY_ID = 'filelist',
		PROGRESS_BAR_RESULT_ID = 'result',
		CKF_UPLOAD_BUTT_ID = 'cke_9',
		CKF_UPDATE_BUTT_ID = 'cke_10',
		CKF_SETTINGS_BUTT_ID = 'cke_11',
		CKF_SIDEBAR_CONTAINER = 'sidebar_container',
		SHIM_FRONT_TOP = 42,
		SHIM_HIDE_TOP = -1000,
		E_IFRAME_READY ='iframeReady',
		E_CKF_NODES_READY = 'ckfNodesReady',
		E_UPLOADER_READY = 'uploaderReady',
		E_ALL_UPLOADED = 'allUploaded',
		SIDEBAR_PADDING = 7 + 7,
		ckfApi = null;


	/* class constructor */
	function CkfShim(config) {
		CkfShim.superclass.constructor.apply(this, arguments);
	}

	/* 
	 * Required NAME static field, to identify the Widget class and 
	 * used as an event prefix, to generate class names etc. (set to the 
	 * class name in camel case). 
	 */
	CkfShim.NAME = "ckfShim";

	/*
	 * The attribute configuration for the widget. This defines the core user facing state of the widget
	 */
	CkfShim.ATTRS = {
		leftOffSet : {
			value: 200,
			setter: "_setLeftOffSet",
			readOnly: false
		},
		isShimFront : {
			value: false,
			setter: "_setShimFront",
			readOnly: false
		},
		ckfApi : {
			readOnly: false,
			lazyAdd: false
		},
		ckfForm : {
			readOnly: false,
			lazyAdd: false
		},
		selectedList : {
			value: {},
			readOnly: false,
			writeOnce: false
		},
		uploadedList : {
			value: {},
			readOnly: false,
			writeOnce: false
		}
	};

	/* The select button takes only a height of 40px, so we put a pic of 30 px in a 40 px div, then regulate the upload div by -10 */
	CkfShim.SHIM_TEMPLATE = "<table id='" + SHIM_TABLE_ID + "' width='100%' height='0'><tr><td id='" + SHIM_SPACER_ID + "' width='220px'></td><td id='" + SHIM_COLUMN_ID + "'><div '" + SHIM_RESIZER_ID + "' style='position: relative; width: 100%; border: 1px color: black'><div id='" + SHIM_ID + "'><div style='height: 200%; background-color:" + SHIM_MARGIN_COLOR + "; width: 7px; position: absolute;' id='shimMargin'></div><div style='position: relative; margin-left: 7px;' id='shimInner'><div id='" + PROGRESS_BAR_RESULT_ID + "'></div><br/><div id='" + SELECT_BUTT_ID + "' class = 'ckf-shim select-button'></div><br/><div id='" + PROGRESS_BAR_CONTAINER_ID + "'><table id='filenames' class='ckf-shim fileupload-table-header'><thead><tr><td>Filename</td><td>File size</td><td>Percent uploaded</td></tr></thead><tbody id='" + PROGRESS_BAR_BODY_ID + "'></tbody></table></div></div></div></div></td></tr></table>";
	

	/* MyWidget extends the base Widget class */
	Y.extend(CkfShim, Y.Widget, {

		initializer: function() {

			Y.log("init", 'info', CkfShim.NAME);
			
			 this.publish(E_IFRAME_READY, {
				bubbles: true,
				defaultFn: this._finalizeCkfNodes,
				broadcast: 2
			}); 
			
			this.publish(E_CKF_NODES_READY, {
				defaultFn: this._finalizeShim
			});
			
			this.publish(E_UPLOADER_READY, {
				defaultFn: this._setUploaderHandlers
			});
			
			this.publish(E_ALL_UPLOADED, {
				bubbles: true,
				broadcast: 2
			});	

		},

		destructor : function() {
			Y.log("destructor", 'info', CkfShim.NAME);
		},

		renderUI : function(src) {
		Y.log("Starting render", 'info', CkfShim.NAME);
			
			this._shimTpl = Node.create(CkfShim.SHIM_TEMPLATE);
			  
			this.containerBox = Node.one(this.get('srcNode'));
			
			this.containerBox.insert(this._shimTpl, 0);
			
			this._shim = Node.one(POUND + SHIM_ID);
			
			this._shimSpacer = Node.one(POUND + SHIM_SPACER_ID);
			
			this._hideShim();
		 
		},

		bindUI : function() {
			/*
			 * bindUI is intended to be used by the Widget subclass 
			 * to bind any event listeners which will drive the Widget UI.
			 * 
			 * It will generally bind event listeners for attribute change
			 * events, to update the state of the rendered UI in response 
			 * to attribute value changes, and also attach any DOM events,
			 * to activate the UI.
			 */
			Y.log("Executing bindUI", 'info', CkfShim.NAME);
			this.on("uploadedListChange", this._setAllUploadComplete, this);
			
			this.on(E_ALL_UPLOADED, this._allUploadedHandler, this);

		},

		syncUI : function() {
			/*
			 * syncUI is intended to be used by the Widget subclass to
			 * update the UI to reflect the initial state of the widget,
			 * after renderUI. From there, the event listeners we bound above
			 * will take over.
			 */
			Y.log("executing syncUI", 'info', CkfShim.NAME);			 
			//start polling for  a specific id in ckf, when found get topical nodes from ckf
			var widget = this,
			t,
			getIframe = function () {
				if(this.iframe){
					Y.log("firing iframe event", 'info', CkfShim.NAME);
					this.fire(E_IFRAME_READY);					
					t.cancel();
					return;
				}
				t= Y.later(200,widget, getIframe, null, false);
				if(document.getElementsByTagName("iframe")){
					if(document.getElementsByTagName("iframe")[0]){
						this.iframe = Node.one(document.getElementsByTagName("iframe")[0].contentDocument || document.getElementsByTagName("iframe")[0].contentWindow.document);
					}					
				}
				Y.log("iframe not found", 'info', CkfShim.NAME);
			};
			getIframe();	
		},

		/* Attribute state supporting methods (see attribute config above) */
		_setLeftOffSet : function () {
			Y.log("Executing _setLeftOffSet", 'info', CkfShim.NAME);
		},
		
		/* setter for isShimFront */
		_setShimFront : function(val) {
			return val === true;
		},
		
		_getCkfSidebarWidth : function() {
			Y.log("Executing _getCkfSidebarWidth", 'info', CkfShim.NAME);
			return parseInt(this._ckfSidebarContainer.getStyle('width'), 10);
		},
		
		/* both bring to front/background and reposition shim */
		_toggleShim : function () {
			Y.log("Executing _toggleShim", 'info', CkfShim.NAME);
			if(this.get('isShimFront')) {
				this._hideShim();
			}else{
				//only reposition when showing
				this._repositionShim();
				this._showShim();
			}
		},
		
		_showShim : function () {
			Y.log("Executing _showShim", 'info', CkfShim.NAME);
			this._shim.setStyle('top', SHIM_FRONT_TOP);
			this._repositionShim();
			this._shim.setStyle('opacity', 1);
			this.set('isShimFront', true);
		},
		
		_hideShim : function () {
			var instance = this;
			this._shim.transition({
				opacity: {
					duration: 1.25,
					value: 0
				}
			}, function(){
				instance._shim.setStyle('top', SHIM_HIDE_TOP);
				instance.set('isShimFront', false);
			});
		},
				
		_repositionShim : function () {
			Y.log("Executing _repositionShim", 'info', CkfShim.NAME);
			this._shimSpacer.setStyle('width', this._getCkfSidebarWidth() + SIDEBAR_PADDING + 'px');
		},
		
		/* default handler for iframeReady event */
		_finalizeCkfNodes : function () {
			//get upload button, sidebar container
			Y.log("Executing _finalizeCkfNodes", 'info', CkfShim.NAME);
			this.ckfUploadButton = this.iframe.one(POUND + CKF_UPLOAD_BUTT_ID);
			this.ckfUpdateButton = this.iframe.one(POUND + CKF_UPDATE_BUTT_ID);
			this.ckfSettingsButton = this.iframe.one(POUND + CKF_SETTINGS_BUTT_ID);
			this._ckfSidebarContainer = this.iframe.one(POUND + CKF_SIDEBAR_CONTAINER);
			this.fire(E_CKF_NODES_READY);
		},
		
		/* default handler for ckfNodesReady event
			Get the side bar width and move the shim to the right correspondingly
			sets up the uploader
			do all what must be done only after the ckf nodes are ready
		*/       
		_finalizeShim : function () {
			Y.log("Executing _finalizeShim", 'info', CkfShim.NAME);
			this._repositionShim();

			/* set up uploader */
			this._selectButton = Node.one(POUND + SELECT_BUTT_ID);
			this._overlayRegion = this._selectButton.get('region');
			 
			
			this._uploader = new Y.Uploader({boundingBox:this._selectButton,
				swfURL: '/yui3/uploader/assets/uploader.swf',
				buttonSkin:"/images/file_mngr/selectFilesButton.png",
				simLimit: 5,
				transparent: true
			});
			
			this._uploader.set("multiFiles", true);

			/* implement events for uploader */
			this._uploader.on("uploaderReady", this._setupUploader, this);
			this._uploader.on("fileselect", this._fileSelect, this);
			this._uploader.on("fileselect", this._uploadFile, this);/* will we get a race condition? */
			this._uploader.on("uploadprogress", this._updateProgress, this);
			this._uploader.on("uploadcomplete", this._uploadComplete, this);
			this._uploader.on("uploadcompletedata", this._uploadCompleteData, this);
			this._uploader.on("uploaderror", this._uploadlogerror, this);
			
			/* ckf upload button is connected to shim */
			this.ckfUploadButton.on("click", this._toggleShim, this);
			/* on upload we don't modify the view */
			this.ckfSettingsButton.on("click", this._hideShim, this);
		
		},
		getSessId : function ()
		{
			return Y.Cookie.get("PHPSESSID", { raw: true });
		},
		
		/* methods for uploader */
		_setupUploader : function (event) {
			Y.log("Executing _setupUploader", 'info', CkfShim.NAME);
			this._uploader.set("multiFiles", true);
			this._uploader.set("log", true);

			var fileFilters = [{description:"All files", extensions:"*.*"},
							   {description:"Pictures", extensions:"*.jpg;*.png;*.gif"},
								{description:"Videos", extensions:"*.avi;*.mov;*.mpg"}
			];/* *.zip;*.tar;*.pdf;*.ppt;*.doc;*.docx;*.els;*.elxs;*.avi;*.mov;*.mpg;*.jpg;*.png;*.gif */

			this._uploader.set("fileFilters", fileFilters);
		},
		
		_clearFileList : function () {
			Y.log("Clearing filelist", 'error', CkfShim.NAME);
			
			//cleanup from previous runs
			this._uploader.clearFileList();
		},
		
		_fileSelect : function (event) {
			Y.log("Executing _fileSelect", 'info', CkfShim.NAME);
					
			var fileData = event.fileList,
				display = this._shim.one(POUND + PROGRESS_BAR_BODY_ID),
				output,
				currentFile,
				key,
				progressBar;/* NB! Only one var for all instances */
			Y.log("Showing filelist: " + Y.log(Y.dump(fileData)), 'info', CkfShim.NAME);
			
			//clear progress bar
			display.empty(true);	
				
			for (key in fileData) {
				if(fileData.hasOwnProperty(key)){
					currentFile = fileData[key];
					output = "<tr><td>" + currentFile.name + "</td><td>" + currentFile.size + "</td><td><div id='div_" + currentFile.id + "'></div></td></tr>\n";
					display.append(output);
					progressBar = new Y.ProgressBar({id:"pb_" + currentFile.id,  layout : '<div class="{labelClass}"></div><div class="{wrapperClass}"><div class="{sliderClass}"></div></div>'});
					
					progressBar.render("#div_" + currentFile.id);
					progressBar.set("progress", 0);
					this._addToSelectedList(currentFile.id);
				}
			}
		},
		
		_updateProgress : function (event) {
			Y.log("Executing _updateProgress", 'info', CkfShim.NAME);
			var pb = Y.Widget.getByNode("#pb_" + event.id);
			pb.set("progress", Math.round(100 * event.bytesLoaded / event.bytesTotal));
		},
		
		_uploadComplete : function (event) {
			Y.log("Executing _uploadComplete", 'info', CkfShim.NAME);
			var pb = Y.Widget.getByNode("#pb_" + event.id);
			pb.set("progress", 100);
			this._addToUploadedList(event.id);
		},
		
		_uploadCompleteData : function (event) {
			Y.log("Executing _uploadCompleteData", 'info', CkfShim.NAME);
			this._shim.one("#result").setContent("Data returned from server:<br>" + event.data);
		},
				
		/* START methods to manage the uploadedList */
		_addToUploadedList : function (fileId) {
			Y.log("Executing _addToUploadedList", 'info', CkfShim.NAME);
			
			var currentList = this.get('uploadedList');
			currentList[fileId]={uploaded: true};
			if(currentList.length !== undefined){
				currentList.length++;
			}else{
				currentList.length = 1;
			}
			Y.log("_addToUploadedList showing currentlist: " + Y.dump(currentList), 'info', CkfShim.NAME);

			this.set('uploadedList',currentList);
		},
		
		_addToSelectedList : function (fileId) {
			Y.log("Executing _addToSelectedList", 'info', CkfShim.NAME);
			
			var currentList = this.get('selectedList');
			currentList[fileId]={status: "OK"};
			if(currentList.length !== undefined){
				currentList.length++;
			}else{
				currentList.length = 1;
			}
			this.set('selectedList',currentList);
			Y.log("Showing AFTER _addToSelectedList: " + Y.dump(this.get('selectedList')), 'info', CkfShim.NAME);
		},

		_setAllUploadComplete : function (event) {
			Y.log("Executing _setAllUploadComplete list lenght: "  + Y.dump(event.details[0].newVal) , 'info', CkfShim.NAME);
			var selected = this.get('selectedList'),
				uploaded = this.get('uploadedList');
			if (selected.length === uploaded.length){
				this.fire(E_ALL_UPLOADED);
			}
		},
		
		_allUploadedHandler : function () {
			Y.log("Executing _allUploadedHandler", 'info', CkfShim.NAME);
			/* hide shim */
			Y.later(1000,this, this._hideShim, null, false);
			
			ckfApi = this.get('ckfApi');
			var ckfForm = this.get('ckfForm');
			
			/* remove customised ckf upload form */
			ckfForm.hide();
			
			/* 'release' upload button */
			this.ckfUploadButton.replaceClass('cke_on', 'cke_off');
			ckfApi.refreshOpenedFolder();
			
			//cleanup from previous runs
			this._uploader.clearFileList();
			
			Y.log("Selected folder:" + ckfApi.getSelectedFolder());
			Y.log("Selected folder view privs:" + ckfApi.getSelectedFolder().acl.folderView);
			Y.log("Selected folder name:" + ckfApi.getSelectedFolder().name);
			Y.log("Selected folder url:" + ckfApi.connector.currentFolderUrl());
		},
		/* END methods to manage the uploadedList */
		
		_uploadFile : function () {
			Y.log("Executing _uploadFile", 'info', CkfShim.NAME);
			ckfApi = this.get('ckfApi');
			Y.log();if(Y.dump){//log added to remove automatically in min ver
			Y.log("ckfApi:" + Y.dump(ckfApi));
			Y.log();}//log added to remove automatically in min ver
		this._uploader.uploadAll("/upload.php", "POST", {sessId:this.getSessId(), selectedFolder: encodeURI(ckfApi.getSelectedFolder())});
		},
		
		_uploadlogerror : function (event){
			Y.log("Executing _uploadlogerror", 'info', CkfShim.NAME);
			Y.log(event);
		}
		   
	});

	Y.namespace("Widget").CkfShim = CkfShim;
	
// }, "3.1.0", {requires:["widget", "substitute"]});
// END WRAPPER


}, '@VERSION@' ,{requires:['widget', 'substitute', 'uploader', 'gallery-progressbar', 'ckf-shim-css', 'cookie', 'transition']});
