YUI.add("gallery-soon",function(a){
/*!
 * based on setImmediate.js. https://github.com/NobleJS/setImmediate
 * Copyright (c) 2011 Barnesandnoble.com, llc and Donavon West
 * https://github.com/NobleJS/setImmediate/blob/master/MIT-LICENSE.txt
 */
(function(g){var e={},d="soon",h=g.config.win,c,b,f;c=function(j){var i=e[j];if(i){i();delete e[j];return true;}return false;};if(g.UA.nodejs&&typeof process!=="undefined"&&"nextTick" in process){b=function(j){var k=g.guid(d),i=f(k,j);process.nextTick(function(){c(k);});return i;};}else{if(!((function(){var i=0;g.Array.some(["setImmediate","mozSetImmediate","msSetImmediate","oSetImmediate","webkitSetImmediate"],function(j){if(j in h){i=h[j];return true;}return false;});if(i){b=function(k){var l=g.guid(d),j=f(l,k);i(function(){c(l);});return j;};}return b;}())||(function(){if(("postMessage" in h)&&!("importScripts" in h)){var j=h.onmessage,i=h.postMessage,k=true;h.onmessage=function(){k=false;};i("","*");h.onmessage=j;if(k){g.on("message",function(l){var m=l._event;if(m.source===h&&c(m.data)){l.halt(true);}});b=function(m){var n=g.guid(d),l=f(n,m);i(n,"*");return l;};}}return b;}())||(function(){if("MessageChannel" in h){var i=new MessageChannel(),j=i.port2;i.port1.onmessage=function(k){c(k.data);};b=function(l){var m=g.guid(d),k=f(m,l);j.postMessage(m);return k;};}return b;}())||(function(){var j=g.Node,i=j.create("<script />");if("onreadystatechange" in i.getDOMNode()){g.mix(j.DOM_EVENTS,{readystatechange:true});b=function(m){var n=g.guid(d),l=f(n,m),k=j.create("<script />");k.on("readystatechange",function(){c(n);k.remove(true);});k.appendTo("body");return l;};}i.destroy();return b;}()))){b=function(j){var k=g.guid(d),i=f(k,j);g.later(0,null,c,[k]);return i;};}}f=function(j,i){e[j]=i;return{cancel:function(){delete e[j];}};};g.soon=b;}(a));},"gallery-2012.03.23-18-00",{requires:["node-base"],skinnable:false});