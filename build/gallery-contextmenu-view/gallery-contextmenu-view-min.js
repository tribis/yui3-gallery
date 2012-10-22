YUI.add("gallery-contextmenu-view",function(a){a.ContextMenuView=a.Base.create("contextmenu",a.View,[],{events:{".yui3-contextmenu-menuitem":{click:"_selectMenuItem"}},template:'<div class="yui3-contextmenu-overlay"></div>',_subscr:null,_overlayDX:null,_overlayDY:null,initializer:function(){var c=this.get("trigger")["node"],b=this.get("trigger")["target"];this._subscr=[];this._subscr.push(c.delegate("contextmenu",this._onContextMenu,b,this));this._subscr.push(this.get("overlay").on("mouseleave",this.hideOverlay,this));this._overlayDX=5;this._overlayDY=11;return this;},destructor:function(){a.Array.each(this._subscr,function(b){b.detach();});this._subscr=null;if(this._subscrTarget){this._subscrTarget.detach();this._subscrTarget=null;}if(this.get("overlay")){this.get("overlay").destroy();}},render:function(){return this;},hideOverlay:function(){if(!this.get("overlay")){return;}this.fire("contextMenuHide");this.get("overlay").hide();},_valOverlay:function(){var c=this.get("container")||null,f=this.get("menuItemTemplate"),e=this.get("menuItems")||[];if(!c){return false;}c.empty();var d=new a.Overlay({srcNode:c,visible:false,zIndex:99,constrain:true});var b="";a.Array.each(e,function(h,g){var i=a.Lang.sub(f,{menuClass:h.className||"yui3-contextmenu-menuitem",menuIndex:g,menuContent:(a.Lang.isString(h))?h:h.label||"unknown"});b+=i;});d.set("bodyContent",b);d.render();return d;},_onContextMenu:function(c){c.preventDefault();this._clearDOMSelection();var b=c.currentTarget;this.set("contextTarget",b);this.get("overlay").set("xy",[c.pageX+this._overlayDX,c.pageY+this._overlayDY]);this.get("overlay").show();this.fire("contextMenuShow",c);},_selectMenuItem:function(f){var b=f.target,d=+(b.getData("cmenu")),c=this.get("menuItems");if(c&&c.length>0){this.set("selectedMenu",{evt:f,menuItem:c[d],menuIndex:d});}this.hideOverlay();this.fire("contextMenuHide",f);},_clearDOMSelection:function(){var b=(a.config.win.getSelection)?a.config.win.getSelection():(a.config.doc.selection)?a.config.doc.selection:null;if(b&&b.empty){b.empty();}if(b&&b.removeAllRanges){b.removeAllRanges();}}},{ATTRS:{container:{valueFn:function(){return a.Node.create(this.template);}},trigger:{value:{node:null,target:""}},contextTarget:{value:null},menuItemTemplate:{value:'<div class="yui3-contextmenu-menuitem {menuClass}" data-cmenu="{menuIndex}">{menuContent}</div>'},menuItems:{value:[],validator:a.Lang.isArray},overlay:{valueFn:"_valOverlay",writeOnce:true,validator:function(b){return b instanceof a.Overlay;}},selectedMenu:{value:null}}});},"gallery-2012.09.05-20-01",{skinnable:true,requires:["base-build","view","overlay","event-mouseenter"]});