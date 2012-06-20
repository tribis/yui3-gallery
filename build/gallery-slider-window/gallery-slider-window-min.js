YUI.add("gallery-slider-window",function(e){var v=21,J=12,a=5,z=700,C=500,r=400,c=287,F=0.5,i="bdc",H="hdc",d="background-position-x",I="px",t="#",m="handle-target",g="container-close",w='<a href="http://www.eaktion.com/sliderwindow/" target="_BLANK" id="sliderwindow_lnk">SliderWindow</a>',h=e.Easing,p="ea_swbdc",b,A,s,D,u=true,G=false,B=u,k="stop",K="publish",q="openWidth",n="height",l="srcNode",f="handleWidth",x="className",y="reverse",E="-",o={};function j(L){j.superclass.constructor.apply(this,arguments);}j.NAME="sliderWindow";j.ATTRS={openWidth:{value:r},headerCWidth:{value:r-v},height:{value:c,setter:"_setHeight"},srcWidth:{setter:"_setSrcWidth"},headerHeight:{value:v},footerHeight:{value:J},resizing:{value:G,setter:"_setResizing",lazyAdd:G},closeTitle:{value:"Click to close/open or ctrl-left/right arrow to close/open"},handleWidth:{value:a},className:{value:"eaSliderWindow"},credit:{value:u},bodyContent:{value:"",setter:"_setBodyContent"},withFocus:{setter:"_setWithFocus",validator:function(L){return this.get("isClosed")&&e.one(L);}},isOpen:{value:false,readOnly:true},isClosed:{value:true,readOnly:true}};j.CLOSE_HANDLE='<div class="'+g+'" title="{title}"></div><div id ="ea_swht" style="'+n+':{closeHandleHeight}px;top:{headerHeight}px;" class="'+m+'" title=""></div>';j.CREDIT='<div style="padding-left:{headerHeight}px;overflow-x:hidden;overflow-y:hidden;width:50%;top:0px;text-align:left;'+n+': {footerHeight}px;font-size: 0.5em;font-family: Arial">{creditCont}</div>';j.HEADER_CONTENT='<div id="ea_swhdc" class="{cssHeaderCont}"></div>';j.BODY_CONTENT='<div id="'+p+'" class="{cssBodyCont}">{userContent}</div>';e.extend(j,e.Overlay,{initializer:function(){},renderUI:function(){this.slider=e.one(t+this.get("id"));b=new e.Anim({node:this.get(l),to:{width:this.get(f)},from:{width:this.get(q)}});b.set("duration",F);b.set("easing",h.easeIn);var N=e.UA.opera>0?"Click to close/open or hit ctrl+shift-left/right arrow to close/open":this.get("closeTitle"),L=this.get("headerHeight"),M=this.getClassName(H);this.get(l).append(e.substitute(j.CLOSE_HANDLE,{title:N,closeHandleHeight:300,headerHeight:L}));this.set("headerContent",e.substitute(j.HEADER_CONTENT,{cssHeaderCont:M}));if(this.get("credit")===G){w="";}A={footerHeight:this.get("footerHeight"),headerHeight:L,creditCont:w};this.set("footerContent",e.substitute(j.CREDIT,A));this.contentElement=e.one(t+p);},bindUI:function(){this.slider.on("click",e.bind(function(M){this._handleClick(M);},this),["."+g,"."+m]);this.after("openWidthChange",this._uiSetOpenWidth,this);this.after("widthChange",this._afterWidthChange,this);e.on("keydown",this._handleArrow,"html",this);b.on("end",this._handleEndBehaviour,this);if(D){var L={maxWidth:D.maxWidth,maxHeight:D.maxHeight};this.resize=new e.Resize(D).plug(e.Plugin.ResizeProxy).plug(e.Plugin.ResizeConstrained,L);this.resize.after("resize:end",function(N){var M=N.details[0].info.offsetHeight;this.set(n,M);this.set("srcWidth",N.details[0].info.offsetWidth);e.bind(this._repositionSlider(),this);this._removeWidthStyle();},this);}},syncUI:function(){this._uiSetHandleWidth();this._uiSetOpenWidth();this._repositionSlider();},_setResizing:function(L){if(L){D={node:t+this.get("id"),handles:["t","tr"],maxWidth:z,maxHeight:C};}return L;},_uiSetOpenWidth:function(){var L=parseInt(this.get(q),10);b.set("from",{width:L});},_uiSetHandleWidth:function(L){var M=parseInt(this.get(f),10);this.get(l).setStyle("width",M+I);},_setWithFocus:function(L){this.once("isOpenChange",function(M,N){this._uiSetWithFocus(N);},this,L);},_uiSetWithFocus:function(L){e.Node.getDOMNode(e.one(L)).focus();},_setHeight:function(L){var M=parseInt(L,10);this.get(l).setStyle(n,M+I);},_setSrcWidth:function(L){var M=parseInt(L,10);this.get(l).setStyle("width",M+I);this.set(q,M);},_repositionSlider:function(){var M=this.slider.get("docScrollY"),L=this.slider.get("winHeight"),N=parseInt(this.get(n),10);this.set("xy",[0,L+M-N]);},_handleClick:function(L){if(g===L.target.get(x)){this.closeWindow();}else{if(m===L.target.get(x)){if(this.get("isClosed")){this._handlePublishMessageEvent(k);}else{this.closeWindow();}}}},publishEvent:function(O,M,L){if(!this._isPublished(O,M,L)){this._storePublished(O,M);this.publish(L+E+O,{emitFacade:false,bubbles:true,broadcast:2});var N=e.delegate(O,this._passThroughEvent,this.get("boundingBox"),M,this,L+E+O);this._saveHandle(N,O,M);}else{}},_isPublished:function(N,M){var O=false;o[N]=o[N]||{};if(undefined!==o[N][M]){O=true;}var L=O?"is not":"is";return O;},_storePublished:function(M,L){o[M][L]={};},_saveHandle:function(N,M,L){o[M][L]=N;},detachEvent:function(M,L){var N=o[M][L].detach();},_passThroughEvent:function(M,L){this.fire(L,M);},_handleMouseDown:function(){},_handleMouseUp:function(){},_handleArrow:function(L){s=G;if(L.ctrlKey){s=u;}if(s){if(L.shiftKey&&!e.UA.opera){return;}if(39==L.charCode){if(this.get("isClosed")){this._handlePublishMessageEvent(k);}L.halt();}if(37==L.charCode){if(this.get("isOpen")){this.closeWindow();}L.halt();}}},_handlePublishMessageEvent:function(L){this._repositionSlider();switch(L){case k:B=u;break;case K:B=G;break;}if(this.get("isClosed")){this.openWindow();}else{if(!B){e.later(F*1000/2,this,"closeWindow");}}},_handleEndBehaviour:function(L){this._setIsOpen();if(this.get("isOpen")){e.one("."+m).setStyle(d,"right");if(B){return;}b.set(y,G);this.closeWindow();}else{e.one("."+m).setStyle(d,"left");}},_setIsOpen:function(){if(parseInt(this.get(l).getStyle("width"),10)<parseInt(this.get(q),10)){this._set("isOpen",false);this._set("isClosed",true);}else{this._set("isOpen",true);this._set("isClosed",false);}},_setBodyContent:function(M){var L=this.getClassName(i);return e.substitute(j.BODY_CONTENT,{cssBodyCont:L,userContent:M});},_removeWidthStyle:function(){this.get("boundingBox").setStyle("width","");},closeWindow:function(){b.set(y,G);this._repositionSlider();b.run();},openWindow:function(){b.set(y,u);b.set("easing",h.easeIn);b.run();},sendMessage:function(L,O,N){var M=G;if(N=="ponderaid"){M=u;}if(!M){this.set("bodyContent",L);
}if(e.Lang.isString(O)){switch(O){case K:this._handlePublishMessageEvent(K);break;case"open":this._handlePublishMessageEvent(k);break;}}else{this._handlePublishMessageEvent(K);}}});e.namespace("Overlay").SliderWindow=j;},"@VERSION@",{requires:["overlay","node","anim-base","anim-easing","substitute"]});