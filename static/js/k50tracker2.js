function utf8_encode(e){var t=unescape,n=window.encodeURIComponent;return t(n(e))}function sha1(e){var t,n,r,s,o,i,a,l,u,c,f=function(e,t){return e<<t|e>>>32-t},d=function(e){var t,n,r="";for(t=7;t>=0;t--)n=e>>>4*t&15,r+=n.toString(16);return r},g=[],p=1732584193,m=4023233417,h=2562383102,_=271733878,y=3285377520,v=[];for(e=utf8_encode(e),c=e.length,n=0;n<c-3;n+=4)r=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),v.push(r);switch(3&c){case 0:n=2147483648;break;case 1:n=e.charCodeAt(c-1)<<24|8388608;break;case 2:n=e.charCodeAt(c-2)<<24|e.charCodeAt(c-1)<<16|32768;break;case 3:n=e.charCodeAt(c-3)<<24|e.charCodeAt(c-2)<<16|e.charCodeAt(c-1)<<8|128}for(v.push(n);14!==(15&v.length);)v.push(0);for(v.push(c>>>29),v.push(c<<3&4294967295),t=0;t<v.length;t+=16){for(n=0;n<16;n++)g[n]=v[t+n];for(n=16;n<=79;n++)g[n]=f(g[n-3]^g[n-8]^g[n-14]^g[n-16],1);for(s=p,o=m,i=h,a=_,l=y,n=0;n<=19;n++)u=f(s,5)+(o&i|~o&a)+l+g[n]+1518500249&4294967295,l=a,a=i,i=f(o,30),o=s,s=u;for(n=20;n<=39;n++)u=f(s,5)+(o^i^a)+l+g[n]+1859775393&4294967295,l=a,a=i,i=f(o,30),o=s,s=u;for(n=40;n<=59;n++)u=f(s,5)+(o&i|o&a|i&a)+l+g[n]+2400959708&4294967295,l=a,a=i,i=f(o,30),o=s,s=u;for(n=60;n<=79;n++)u=f(s,5)+(o^i^a)+l+g[n]+3395469782&4294967295,l=a,a=i,i=f(o,30),o=s,s=u;p=p+s&4294967295,m=m+o&4294967295,h=h+i&4294967295,_=_+a&4294967295,y=y+l&4294967295}return u=d(p)+d(m)+d(h)+d(_)+d(y),u.toLowerCase()}function generateUUID(){var e=new Date;return sha1((navigator.userAgent||"")+(navigator.appName||"")+e.getTime()+Math.random()).slice(0,16)}if("object"!=typeof k50Tracker)var k50Tracker=function(){function _forEach(e,t){for(var n=0;n<e.length;n++)t.apply(this,[e[n],n,this])}function _trim(e){return e.replace(/^\s+|\s+$/g,"")}function utmMismatch(e,t){utms=["utm_content","utm_term","utm_campaign","utm_source","utm_medium"];for(var n=0;n<utms.length;n++)if(getParameterByName(utms[n],e)!=getParameterByName(utms[n],t)&&""!=getParameterByName(utms[n],t))return!0;return!1}function getParameterByName(e,t){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var n=new RegExp("[\\?&]"+e+"=([^&#]*)"),r=n.exec(t);return null===r?"":r[1].replace(/\+/g," ")}function _simple_domain(e){var t=e.match(/^https?\:\/\/(?:[a-z_\u0430-\u044f\d-]*\.)*([^\/?#]+)[.]([a-z\u0430-\u044f\d-]*)(?:[\/?#]|$)/i);return null==t?null:t[1]+"."+t[2]}var _instances=[],_k50Tracker=function(){function rotate(){if(!/^\d+$/.test(self._settings.siteId))return!1;var e=getVisitParams();e.userTimestamp=Math.round((new Date).getTime()/1e3),e.isRobot=isRobot(),getCookie("k50uuid")?e.uuid=getCookie("k50uuid"):e.uuid=generateUUID(),isNewVisit()?(setCookie(getVisitParamsHash(!1),"k50lastvisit",525600),e.cookie="",e.sid=generateUUID()):(getCookie("k50cookie")&&(e.cookie=getCookie("k50cookie")),getCookie("k50sid")?e.sid=getCookie("k50sid"):e.sid=generateUUID()),e.label=self._settings.label,setCookie(e.uuid||"","k50uuid",self._settings.uuidInterval),setCookie(e.sid||"","k50sid",self._settings.sessionInterval),delete e.timestamp,sendRequest(self._settings.urlRotate+"/"+self._settings.siteId,"POST",e,function(e){if(self._result=k50JSON.parse(e),self._result){if(self._result.settings)for(var t in self._result.settings)if(self._result.settings.hasOwnProperty(t)){if(~t.indexOf("cssSelector")&&self._settings[t])continue;self._settings[t]=self._result.settings[t]}setCookie(getVisitParamsHash(!0),"k50lastvisit",525600),setCookie(self._result.uuid||"","k50uuid",self._settings.uuidInterval),setCookie(self._result.cookie||"","k50cookie","code"==self._result.rotatorType?self._settings.codeInterval:self._settings.phoneInterval),setCookie(self._result.sid||"","k50sid",self._settings.sessionInterval),self.change(),self._settings.enableAnalyticsIntegration&&Analytics.sendClientId(),self._settings.metrikaId&&Metrika.sendMetrikaClientId(self._settings.metrikaId)}})}function getServer(){if(!self._settings.servers.length)return{};var e=parseInt(self._settings.siteId);isNaN(e)&&console.warn("K50 Tracker Error: wrong siteId specified");var t=e%self._settings.mod,n=self._settings.mod/self._settings.servers.length,r=Math.floor(t/n);return{id:r,url:self._settings.servers[r]}}function getCookie(e){self._settings.cookiePrefix&&(e=self._settings.cookiePrefix+"_"+e||e);for(var t=e+"=",n=document.cookie.split(";"),r=0;r<n.length;r++){var s=_trim(n[r]);if(0==s.indexOf(t))return k50JSON.parse(s.substring(t.length,s.length))}return null}function setCookie(e,t,n){self._settings.cookiePrefix&&(t=self._settings.cookiePrefix+"_"+t||t);var r=new Date;r.setTime(r.getTime()+60*n*1e3);var s="expires="+r.toUTCString(),o=k50JSON.stringify(e),i=_simple_domain("http://"+location.host),a="."+i;document.cookie=t+"="+o+"; path=/; domain="+a+"; "+s}function isRobot(){var e=navigator.userAgent.toLowerCase(),t=document.referrer;return!!(~e.indexOf("bot")&&!~e.indexOf("cubot")||~e.indexOf("spider")||~e.indexOf("crawl")||~e.indexOf("curl")||~e.indexOf("search")||~e.indexOf("seek"))||~t.indexOf("metrika.yandex.ru/stat/visor/player")||~t.indexOf("metrika.yandex.ru/inpage/visor-player")}function isNewVisit(){if("object"==typeof getCookie("k50lastvisit"))return!0;var e=getCookie("k50lastvisit").split(".");if(e){var t=getVisitParamsHash(!1).split(".");return Number(t[4])>Number(e[4])+6e4*self._settings.sessionInterval||(e[3]!=t[3]&&"da39a3ee5e6b4b0d3255bfef95601890afd80709"!=t[3]||t[0]!=e[0]&&t[0]!=t[2]&&("da39a3ee5e6b4b0d3255bfef95601890afd80709"!=t[1]&&e[1]!=t[1]))}return setCookie(getVisitParamsHash(!0),"k50lastvisit",525600),!0}function getVisitParams(){return self._settings.landing!==!1?landing=self._settings.landing:landing=document.URL,{referrer:document.referrer,landing:landing,timestamp:(new Date).getTime()}}function getVisitParamsHash(e){self._settings.landing!==!1?landing=self._settings.landing:landing=document.URL;for(var t=["utm_content","utm_term","utm_campaign","utm_source","utm_medium"],n="",r=0;r<t.length;r++)n+=getParameterByName(t[r],landing);var s=sha1(document.referrer),o=sha1(n);if(e){var i=getCookie("k50lastvisit");null!=i&&"object"!=typeof i&&(i=i.split("."),s=i[1],o=i[3])}var a=(new Date).getTime();return[sha1(_simple_domain(document.referrer)),s,sha1(_simple_domain(landing)),o,a].join(".")}function sendRequest(e,t,n,r,s){function o(){self._sendRetries++,self._settings.servers.length&&(3==self._sendRetries&&(self._settings.servers.splice(l.id,1),setCookie(self._settings.servers,"k50servers",5),self._sendRetries=0),setTimeout(function(){sendRequest(e,t,n,r,s)},5e3*self._sendRetries))}var i,a=[],l=getServer(),u="https:"+l.url+e;if(s=!0,void 0!=l.id){for(var c in n)a.push(encodeURIComponent(c)+"="+encodeURIComponent(n[c]));try{if("undefined"!=typeof XDomainRequest)throw{};i=new XMLHttpRequest,i.open(t,u,s),"POST"==t&&i.setRequestHeader("Content-type","application/x-www-form-urlencoded"),i.onreadystatechange=function(){4==i.readyState&&(200==i.status?"function"==typeof r&&r(i.responseText):o())};try{i.send(a.join("&"))}catch(e){console.warn("K50 Tracker Error: "+e.message),o()}}catch(e){var f=document.createElement("script");"function"==typeof r&&(f.onreadystatechange=f.onload=function(){try{r(k50JSON.stringify(k50RotatorResult))}catch(e){}}),f.src=u+="?_format=js&"+a.join("&"),document.getElementsByTagName("head")[0].appendChild(f)}}}function replaceDomData(e,t){function n(e,t,r){var s=e.childNodes;_forEach(s,function(e){if(e.childNodes.length)n(e,t,r);else{var s=new RegExp(t,"gi");e.data&&s.test(e.data)&&(e.data=e.data.replace(s,r))}})}if(/{.*}/.test(e)){var r=e.split(/\s*,\s*/);_forEach(r,function(e){var r=e.match(/(.+?)?(?:.?[>\+~].?)?{(.*)}/),s=null,o=null;3==r.length&&(s=r[1]?document.querySelectorAll(r[1]):document.querySelectorAll("body"),o=r[2]),s&&o&&_forEach(s,function(e){n(e,o,t)})})}else{var s=document.querySelectorAll(e);s&&_forEach(s,function(e){e.innerHTML=t})}}var self=this;this._sendRetries=0,this._domReadyInterval=0,this._settings={mode:"phone",label:"",servers:["//track.k50.ru","//rotator03.k50.ru"],urlRotate:"/rotate",urlParams:"/send/params",landing:!1,mod:5040,domReady:"k50DomReady",sessionInterval:180,uuidInterval:5256e3,codeInterval:180,phoneInterval:43200},this._result={},this.init=function(e){for(var t in e)e.hasOwnProperty(t)&&(this._settings[t]=e[t]);var n=getCookie("k50servers");if(n&&n.length&&(this._settings.servers=n),setInterval(function(){rotate()},864e5),"k50DomReady"==this._settings.domReady&&k50DomReady(function(){rotate()}),"k50BeforeDomReady"==this._settings.domReady){rotate();var r=r||{},s=this._settings.siteId+"";r[s]=setInterval(this.change,100),k50DomReady(function(){change(),clearInterval(r[s])})}},this.getResultData=function(){var e={};return e.sid=self._result.sid,e.uuid=self._result.uuid,e.counterId=self._settings.siteId,"code"==self._result.rotatorType&&self._result.code&&(e.code=self._result.code),"phone"==self._result.rotatorType&&self._result.phones&&(e.phones=self._result.phones),self._result.ip&&(e.ip=self._result.ip),self._result.geo&&(e.geo=self._result.geo),self._result.userAgent&&(e.userAgent=self._result.userAgent),e},this.change=function(){if("code"==self._result.rotatorType&&Code.setCode(self._result),"phone"==self._result.rotatorType&&Phone.setNumber(self._result),self._result.callback){var data={};data.sid=self._result.sid,data.uuid=self._result.uuid,"code"==self._result.rotatorType&&self._result.code&&(data.code=self._result.code),"phone"==self._result.rotatorType&&self._result.phones&&(data.phones=self._result.phones);try{eval(self._result.callback)}catch(e){console.log(e)}}if("function"==typeof self._settings.callback){var data={};data.sid=self._result.sid,data.uuid=self._result.uuid,"code"==self._result.rotatorType&&self._result.code&&(data.code=self._result.code),"phone"==self._result.rotatorType&&self._result.phones&&(data.phones=self._result.phones),self._settings.callback.call(window,data)}};var Code=function(){function e(e){e.code&&n._settings.cssSelector1&&replaceDomData(n._settings.cssSelector1,t(e.code))}function t(e){return e.toString().match(new RegExp(".{1,4}$|.{1,3}","g")).join("-")}var n=self;return{setCode:e}}(),Phone=function(){function e(e){if(e.phones)for(var n=0;n<e.phones.length;n++)e.phones[n].number_formatted&&replaceDomData(t._settings["cssSelector"+(n+1)],e.phones[n].number_formatted)}var t=self;return{setNumber:e}}(),Analytics=function(){function e(){if("function"==typeof window.ga&&"function"==typeof window.ga.getAll){var e=ga.getAll()[0];if(e){var n=ga.getAll()[0].get("clientId");if(n){var r=k50JSON.stringify({analyticsClientId:n});sendRequest(self._settings.urlParams+"/"+self._settings.siteId,"POST",{sid:getCookie("k50sid"),params:r})}}}else t()}function t(){n++,n<=5&&setTimeout(function(){e()},1e3*n)}var n=0;return{sendClientId:e}}(),Metrika=function(){function e(e){if("object"==typeof window["yaCounter"+e]){var n=window["yaCounter"+e];if(n._inited){var r=window["yaCounter"+e].getClientID();if(r){var s=k50JSON.stringify({metrikaClientId:r});sendRequest(self._settings.urlParams+"/"+self._settings.siteId,"POST",{sid:getCookie("k50sid"),params:s})}}}else t(e)}function t(t){n++,n<=5&&setTimeout(function(){e(t)},1e3*n)}var n=0;return{sendMetrikaClientId:e}}()},init=function(e){var t=e.siteId,n=!1;if(t||(console.error("k50Tracker: \u0432\u044b \u043d\u0435 \u0443\u043a\u0430\u0437\u0430\u043b\u0438 siteId \u0432 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0430\u0445 \u0438\u043d\u0438\u0446\u0438\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0438 \u0441\u0447\u0435\u0442\u0447\u0438\u043a\u0430"),n=!0),_forEach(_instances,function(e){t==e._settings.siteId&&(console.warn("k50Tracker: \u0441\u0447\u0435\u0442\u0447\u0438\u043a \u0441 siteId "+t+" \u0443\u0436\u0435 \u043f\u0440\u043e\u0438\u043d\u0438\u0446\u0438\u0430\u043b\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u043d"),n=!0)}),!n){_instances.length&&!e.cookiePrefix&&(e.cookiePrefix=e.siteId);var r=new _k50Tracker;return _instances.push(r),r.init(e),r}},change=function(){_forEach(_instances,function(e){e.change()})},getResultData=function(){return _instances[0].getResultData()};return{init:init,change:change,getResultData:getResultData}}();if("object"!=typeof k50DomReady)var k50DomReady=function(){function e(){if(!o.isReady){try{document.documentElement.doScroll("left")}catch(t){return void setTimeout(e,1)}o.ready()}}function t(e){o.bindReady();o.type(e);n.done(e)}var n,r,s={};s["[object Boolean]"]="boolean",s["[object Number]"]="number",s["[object String]"]="string",s["[object Function]"]="function",s["[object Array]"]="array",s["[object Date]"]="date",s["[object RegExp]"]="regexp",s["[object Object]"]="object";var o={isReady:!1,readyWait:1,holdReady:function(e){e?o.readyWait++:o.ready(!0)},ready:function(e){if(e===!0&&!--o.readyWait||e!==!0&&!o.isReady){if(!document.body)return setTimeout(o.ready,1);if(o.isReady=!0,e!==!0&&--o.readyWait>0)return;n.resolveWith(document,[o])}},bindReady:function(){if(!n){if(n=o._Deferred(),"complete"===document.readyState)return setTimeout(o.ready,1);if(document.addEventListener)document.addEventListener("DOMContentLoaded",r,!1),window.addEventListener("load",o.ready,!1);else if(document.attachEvent){document.attachEvent("onreadystatechange",r),window.attachEvent("onload",o.ready);var t=!1;try{t=null==window.frameElement}catch(e){}document.documentElement.doScroll&&t&&e()}}},_Deferred:function(){var e,t,n,r=[],s={done:function(){if(!n){var t,i,a,l,u,c=arguments;for(e&&(u=e,e=0),t=0,i=c.length;t<i;t++)a=c[t],l=o.type(a),"array"===l?s.done.apply(s,a):"function"===l&&r.push(a);u&&s.resolveWith(u[0],u[1])}return this},resolveWith:function(s,o){if(!n&&!e&&!t){o=o||[],t=1;try{for(;r[0];)r.shift().apply(s,o)}finally{e=[s,o],t=0}}return this},resolve:function(){return s.resolveWith(this,arguments),this},isResolved:function(){return!(!t&&!e)},cancel:function(){return n=1,r=[],this}};return s},type:function(e){return null==e?String(e):s[Object.prototype.toString.call(e)]||"object"}};return document.addEventListener?r=function(){document.removeEventListener("DOMContentLoaded",r,!1),o.ready()}:document.attachEvent&&(r=function(){"complete"===document.readyState&&(document.detachEvent("onreadystatechange",r),o.ready())}),t}();"object"!=typeof k50JSON&&(k50JSON=window.JSON||{}),function(){"use strict";function f(e){return e<10?"0"+e:e}function objectToJSON(e,t){var n=Object.prototype.toString.apply(e);return"[object Date]"===n?isFinite(e.valueOf())?e.getUTCFullYear()+"-"+f(e.getUTCMonth()+1)+"-"+f(e.getUTCDate())+"T"+f(e.getUTCHours())+":"+f(e.getUTCMinutes())+":"+f(e.getUTCSeconds())+"Z":null:"[object String]"===n||"[object Number]"===n||"[object Boolean]"===n?e.valueOf():"[object Array]"!==n&&"function"==typeof e.toJSON?e.toJSON(t):e}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,s,o,i,a=gap,l=t[e];switch(l&&"object"==typeof l&&(l=objectToJSON(l,e)),"function"==typeof rep&&(l=rep.call(t,e,l)),typeof l){case"string":return quote(l);case"number":return isFinite(l)?String(l):"null";case"boolean":case"null":return String(l);case"object":if(!l)return"null";if(gap+=indent,i=[],"[object Array]"===Object.prototype.toString.apply(l)){for(o=l.length,n=0;n<o;n+=1)i[n]=str(n,l)||"null";return s=0===i.length?"[]":gap?"[\n"+gap+i.join(",\n"+gap)+"\n"+a+"]":"["+i.join(",")+"]",gap=a,s}if(rep&&"object"==typeof rep)for(o=rep.length,n=0;n<o;n+=1)"string"==typeof rep[n]&&(r=rep[n],s=str(r,l),s&&i.push(quote(r)+(gap?": ":":")+s));else for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(s=str(r,l),s&&i.push(quote(r)+(gap?": ":":")+s));return s=0===i.length?"{}":gap?"{\n"+gap+i.join(",\n"+gap)+"\n"+a+"}":"{"+i.join(",")+"}",gap=a,s}}var cx=new RegExp("[\0\xad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]","g"),pattern='\\\\\\"\0-\x1f\x7f-\x9f\xad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]',escapable=new RegExp("["+pattern,"g"),gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;"function"!=typeof k50JSON.stringify&&(k50JSON.stringify=function(e,t,n){var r;if(gap="",indent="","number"==typeof n)for(r=0;r<n;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("k50JSON.stringify");return str("",{"":e})}),"function"!=typeof k50JSON.parse&&(k50JSON.parse=function(text,reviver){function walk(e,t){var n,r,s=e[t];if(s&&"object"==typeof s)for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(r=walk(s,n),void 0!==r?s[n]=r:delete s[n]);return reviver.call(e,t,s)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})),new RegExp("^[\\],:{}\\s]*$").test(text.replace(new RegExp('\\\\(?:["\\\\/bfnrt]|u[0-9a-fA-F]{4})',"g"),"@").replace(new RegExp('"[^"\\\\\n\r]*"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?',"g"),"]").replace(new RegExp("(?:^|:|,)(?:\\s*\\[)+","g"),"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("k50JSON.parse")})}(),function(){document.querySelectorAll||(document.querySelectorAll=function(e){for(var t=[],n=0,r=document.all,s=r.length,o=document.styleSheets.length?document.styleSheets:[document.createStyleSheet()],i=e.split(","),a=0;a<i.length;a++)o[0].addRule(i[a],"foo:bar");for(;n<s;n++)"bar"===r[n].currentStyle.foo&&t.push(r[n]);return t},document.querySelector=function(e){return document.querySelectorAll(e)[0]})}(),!document.utf8_encode,!document.sha1,!document.generateUUID;