YUI.add("gallery-icello-button",function(b){var m="icello-button",e=b.ClassNameManager.getClassName,c=function(p){return e(m,p);},g=function(p){return e(m,"icon",p);},j={DISABLED:c("disabled")},l=null,n={ICON_ONLY:['<button class="yui3-widget yui3-icello-button yui3-icello-button-content yui3-icello-button-icononly">','<span class="yui3-icello-button-icon {icon}"></span>','<span class="yui3-icello-button-label">&nbsp;</span>',"</button>"],ICON_WITH_LABEL:['<button class="yui3-widget yui3-icello-button yui3-icello-button-content yui3-icello-button-iconwithlabel">','<span class="yui3-icello-button-icon {icon}"></span>','<span class="yui3-icello-button-label">{label}</span>',"</button>"],LABEL_ONLY:['<button class="yui3-widget yui3-icello-button yui3-icello-button-content yui3-icello-button-labelonly">','<span class="yui3-icello-button-label">{label}</span>',"</button>"]},h=function(){},k=b.Node,i=b.Lang,f=function(){this.addClass(j.DISABLED);this.set("disabled",true);},a=function(){this.removeClass(j.DISABLED);this.set("disabled",false);},d=function(p,r){var q=null,s=null,t=null;if(p.icon){t=p.icon.toUpperCase();if(b.Object.hasKey(l,t)){p.icon=l[t];}}q=i.sub(r.join(""),p);s=k.create(q);s.disable=f;s.enable=a;if(p.id){s.set("id",p.id);}if(p.title){s.set("title",p.title);}if(p.disabled){s.disable();}return s;},o=function(p){return i.isString(p)&&p.replace(/ /g,"")!=="";};l={ALERT:g("alert"),ARROWREFRESH_1_E:g("arrowrefresh-1-e"),ARROWREFRESH_1_N:g("arrowrefresh-1-n"),ARROWREFRESH_1_S:g("arrowrefresh-1-s"),ARROWREFRESH_1_W:g("arrowrefresh-1-w"),ARROWRETURNTHICK_1_E:g("arrowreturnthick-1-e"),ARROWRETURNTHICK_1_N:g("arrowreturnthick-1-n"),ARROWRETURNTHICK_1_S:g("arrowreturnthick-1-s"),ARROWRETURNTHICK_1_W:g("arrowreturnthick-1-w"),ARROWRETURN_1_E:g("arrowreturn-1-e"),ARROWRETURN_1_N:g("arrowreturn-1-n"),ARROWRETURN_1_S:g("arrowreturn-1-s"),ARROWRETURN_1_W:g("arrowreturn-1-w"),ARROWSTOP_1_E:g("arrowstop-1-e"),ARROWSTOP_1_N:g("arrowstop-1-n"),ARROWSTOP_1_S:g("arrowstop-1-s"),ARROWSTOP_1_W:g("arrowstop-1-w"),ARROWTHICKSTOP_1_E:g("arrowthickstop-1-e"),ARROWTHICKSTOP_1_N:g("arrowthickstop-1-n"),ARROWTHICKSTOP_1_S:g("arrowthickstop-1-s"),ARROWTHICKSTOP_1_W:g("arrowthickstop-1-w"),ARROWTHICK_1_E:g("arrowthick-1-e"),ARROWTHICK_1_N:g("arrowthick-1-n"),ARROWTHICK_1_NE:g("arrowthick-1-ne"),ARROWTHICK_1_NW:g("arrowthick-1-nw"),ARROWTHICK_1_S:g("arrowthick-1-s"),ARROWTHICK_1_SE:g("arrowthick-1-se"),ARROWTHICK_1_SW:g("arrowthick-1-sw"),ARROWTHICK_1_W:g("arrowthick-1-w"),ARROWTHICK_2_E_W:g("arrowthick-2-e-w"),ARROWTHICK_2_NE_SW:g("arrowthick-2-ne-sw"),ARROWTHICK_2_N_S:g("arrowthick-2-n-s"),ARROWTHICK_2_SE_NW:g("arrowthick-2-se-nw"),ARROW_1_E:g("arrow-1-e"),ARROW_1_N:g("arrow-1-n"),ARROW_1_NE:g("arrow-1-ne"),ARROW_1_NW:g("arrow-1-nw"),ARROW_1_S:g("arrow-1-s"),ARROW_1_SE:g("arrow-1-se"),ARROW_1_SW:g("arrow-1-sw"),ARROW_1_W:g("arrow-1-w"),ARROW_2_E_W:g("arrow-2-e-w"),ARROW_2_NE_SW:g("arrow-2-ne-sw"),ARROW_2_N_S:g("arrow-2-n-s"),ARROW_2_SE_NW:g("arrow-2-se-nw"),ARROW_4:g("arrow-4"),ARROW_4_DIAG:g("arrow-4-diag"),BATTERY_0:g("battery-0"),BATTERY_1:g("battery-1"),BATTERY_2:g("battery-2"),BATTERY_3:g("battery-3"),BOOKMARK:g("bookmark"),BULLET:g("bullet"),CALCULATOR:g("calculator"),CALENDAR:g("calendar"),CANCEL:g("cancel"),CARAT_1_E:g("carat-1-e"),CARAT_1_N:g("carat-1-n"),CARAT_1_NE:g("carat-1-ne"),CARAT_1_NW:g("carat-1-nw"),CARAT_1_S:g("carat-1-s"),CARAT_1_SE:g("carat-1-se"),CARAT_1_SW:g("carat-1-sw"),CARAT_1_W:g("carat-1-w"),CARAT_2_E_W:g("carat-2-e-w"),CARAT_2_N_S:g("carat-2-n-s"),CART:g("cart"),CHECK:g("check"),CIRCLESMALL_CLOSE:g("circlesmall-close"),CIRCLESMALL_MINUS:g("circlesmall-minus"),CIRCLESMALL_PLUS:g("circlesmall-plus"),CIRCLE_ARROW_E:g("circle-arrow-e"),CIRCLE_ARROW_N:g("circle-arrow-n"),CIRCLE_ARROW_S:g("circle-arrow-s"),CIRCLE_ARROW_W:g("circle-arrow-w"),CIRCLE_CHECK:g("circle-check"),CIRCLE_CLOSE:g("circle-close"),CIRCLE_MINUS:g("circle-minus"),CIRCLE_PLUS:g("circle-plus"),CIRCLE_TRIANGLE_E:g("circle-triangle-e"),CIRCLE_TRIANGLE_N:g("circle-triangle-n"),CIRCLE_TRIANGLE_S:g("circle-triangle-s"),CIRCLE_TRIANGLE_W:g("circle-triangle-w"),CIRCLE_ZOOMIN:g("circle-zoomin"),CIRCLE_ZOOMOUT:g("circle-zoomout"),CLIPBOARD:g("clipboard"),CLOCK:g("clock"),CLOSE:g("close"),CLOSETHICK:g("closethick"),COMMENT:g("comment"),CONTACT:g("contact"),COPY:g("copy"),DISK:g("disk"),DOCUMENT:g("document"),DOCUMENT_B:g("document-b"),EJECT:g("eject"),EXTLINK:g("extlink"),FLAG:g("flag"),FOLDER_COLLAPSED:g("folder-collapsed"),FOLDER_OPEN:g("folder-open"),GEAR:g("gear"),GRIPSMALL_DIAGONAL_SE:g("gripsmall-diagonal-se"),GRIP_DIAGONAL_SE:g("grip-diagonal-se"),GRIP_DOTTED_HORIZONTAL:g("grip-dotted-horizontal"),GRIP_DOTTED_VERTICAL:g("grip-dotted-vertical"),GRIP_SOLID_HORIZONTAL:g("grip-solid-horizontal"),GRIP_SOLID_VERTICAL:g("grip-solid-vertical"),HEART:g("heart"),HELP:g("help"),HOME:g("home"),IMAGE:g("image"),INFO:g("info"),KEY:g("key"),LIGHTBULB:g("lightbulb"),LINK:g("link"),LOCKED:g("locked"),MAIL_CLOSED:g("mail-closed"),MAIL_OPEN:g("mail-open"),MINUS:g("minus"),MINUSTHICK:g("minusthick"),NEWWIN:g("newwin"),NOTE:g("note"),NOTICE:g("notice"),PAUSE:g("pause"),PENCIL:g("pencil"),PERSON:g("person"),PIN_S:g("pin-s"),PIN_W:g("pin-w"),PLAY:g("play"),PLUS:g("plus"),PLUSTHICK:g("plusthick"),POWER:g("power"),PRINT:g("print"),RADIO_OFF:g("radio-off"),RADIO_ON:g("radio-on"),REFRESH:g("refresh"),SCISSORS:g("scissors"),SCRIPT:g("script"),SEARCH:g("search"),SEEK_END:g("seek-end"),SEEK_FIRST:g("seek-first"),SEEK_NEXT:g("seek-next"),SEEK_PREV:g("seek-prev"),SEEK_START:g("seek-start"),SHUFFLE:g("shuffle"),SIGNAL:g("signal"),SIGNAL_DIAG:g("signal-diag"),SQUARESMALL_CLOSE:g("squaresmall-close"),SQUARESMALL_MINUS:g("squaresmall-minus"),SQUARESMALL_PLUS:g("squaresmall-plus"),STAR:g("star"),STOP:g("stop"),SUITCASE:g("suitcase"),TAG:g("tag"),TRANSFERTHICK_E_W:g("transferthick-e-w"),TRANSFER_E_W:g("transfer-e-w"),TRASH:g("trash"),TRIANGLE_1_E:g("triangle-1-e"),TRIANGLE_1_N:g("triangle-1-n"),TRIANGLE_1_NE:g("triangle-1-ne"),TRIANGLE_1_NW:g("triangle-1-nw"),TRIANGLE_1_S:g("triangle-1-s"),TRIANGLE_1_SE:g("triangle-1-se"),TRIANGLE_1_SW:g("triangle-1-sw"),TRIANGLE_1_W:g("triangle-1-w"),TRIANGLE_2_E_W:g("triangle-2-e-w"),TRIANGLE_2_N_S:g("triangle-2-n-s"),UNLOCKED:g("unlocked"),VIDEO:g("video"),VOLUME_OFF:g("volume-off"),VOLUME_ON:g("volume-on"),WRENCH:g("wrench"),ZOOMIN:g("zoomin"),ZOOMOUT:g("zoomout")};
b.namespace("Icello");h.ICONS=l;h.getNode=function(p){var q=null;p=b.merge(p);if(p.label&&!o(p.label)){p.label=null;}if(p.icon&&p.label){q=d(p,n.ICON_WITH_LABEL);}else{if(p.icon&&!p.label){q=d(p,n.ICON_ONLY);}else{if(!p.icon&&p.label){q=d(p,n.LABEL_ONLY);}else{throw {name:"IconAndLabelNotDefinedButtonException",message:"Icello Button getNode: either 'icon' or button's content/label must be defined"};}}}return q;};h.renderNode=function(u){var t=u,q=null,s=null,r=null,p=function(w){var v={};if(w.hasAttribute("id")){v.id=w.get("id");}if(w.hasAttribute("data-icon")){v.icon=w.getAttribute("data-icon");}v.disabled=w.get("disabled");if(w.hasAttribute("title")){v.title=w.get("title");}s=w.getContent();if(o(s)){v.label=s;}return v;};if(b.Lang.isString(u)){t=b.one(u);}q=p(t);r=h.getNode(q);t.replace(r);return r;};b.Icello.Button=h;},"gallery-2012.05.16-20-37",{skinnable:true,requires:["classnamemanager","node"]});