YUI.add("gallery-async-command-timeout",function(a){(function(g,b){var c="timeout",f=g.Plugin,d=g.Array.invoke,e=g.later;f.AsyncCommandTimeout=g.Base.create(b,f.Base,[],{destructor:function(){var h=this;d(h._subs,"detach");if(h._timer){h._timer.cancel();delete h._timer;}},initializer:function(){var i=this,h=i.get("host"),j=i.get(c);if(!j){return;}i._subs=[h.on("start",function(){i._timer=e(j,h,h.fire,["failure",{error:c}]);}),h.on("success",function(k){if(h.get("completed")){k.preventDefault();}else{if(i._timer){i._timer.cancel();}}delete i._timer;})];}},{ATTRS:{timeout:{value:0,writeOnce:"initOnly"}},NS:c});}(a,arguments[1]));},"gallery-2012.06.20-20-07",{requires:["array-invoke","gallery-async-command","plugin"],skinnable:false});