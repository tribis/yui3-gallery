YUI.add("gallery-idletimer",function(g){var d=false,h=-1,b=false,f=g.config.doc,e=30000;function c(i){clearTimeout(h);if(b){if(/visibilitychange/.test(i.type)){a(f.hidden||f.msHidden||f.webkitHidden||f.mozHidden);}else{if(d){a();}}h=setTimeout(a,e);}}function a(i){var j=false;if(typeof i!="undefined"){if(i!=d){d=i;j=true;}}else{d=!d;j=true;}if(j){g.IdleTimer.fire(d?"idle":"active");}}g.IdleTimer={isRunning:function(){return b;},isIdle:function(){return d;},start:function(i){b=true;d=false;if(typeof i=="number"){e=i;}g.on("mousemove",c,f);g.on("mousedown",c,f);g.on("keydown",c,f);if(f.addEventListener){f.addEventListener("msvisibilitychange",c,false);f.addEventListener("webkitvisibilitychange",c,false);f.addEventListener("mozvisibilitychange",c,false);}h=setTimeout(a,e);},stop:function(){b=false;clearTimeout(h);g.detach("mousemove",c,f);g.detach("mousedown",c,f);g.detach("keydown",c,f);if(f.removeEventListener){f.removeEventListener("msvisibilitychange",c,false);f.removeEventListener("webkitvisibilitychange",c,false);f.removeEventListener("mozvisibilitychange",c,false);}}};g.augment(g.IdleTimer,g.Event.Target);},"gallery-2012.09.12-20-02",{requires:["event","event-custom"]});