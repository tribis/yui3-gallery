YUI.add("gallery-async-command-delay",function(a){(function(c,b){var h="delay",j="delayed",g="run",d=c.Do,f=d.AlterReturn,k=d.Prevent,e=c.Plugin,i=c.delay;e.AsyncCommandDelay=c.Base.create(b,e.Base,[],{initializer:function(){var m=this,l=m.get("host"),n=l.run;m.afterHostMethod(g,function(){return new f(j,l);});m.beforeHostMethod(g,function(){i(n,m.get(h)).call(l);return new k(j);});}},{ATTRS:{delay:{value:0,writeOnce:"initOnly"}},NS:h});}(a,arguments[1]));},"gallery-2012.06.20-20-07",{requires:["gallery-async-command","gallery-delay","plugin"],skinnable:false});