/*!
 
 Build Thu Jan 24 2019 10:12:37 GMT+0000 (GMT Standard Time) - 1.0.0

 Licensed under the  License

 Author: 
*/
!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/xcc/rest/public/custom/",t(t.s=0)}([function(e,t,n){"use strict";!function(e,t){function n(n,o){n.html(e.U.createLoadingIcon());var r={"script-name":"paultest_22597525","client-data":{firstValue:"test1",secondValue:"test2"}};console.log(r),t.ajax({url:"/muse/data/post",headers:{"Content-Type":"application/json"},method:"POST",data:r}).done(function(e){console.log(JSON.stringify(e)),"MUSE data saved"===e.message?console.log("Successfully saved to MUSE proxy"):console.log("Failed to save activities to MUSE proxy: "+e.message);var t="<div>Response from MUSE: "+JSON.stringify(e)+"</div>";n.html(t)}).fail(function(t){e.console.error(t)}).always(function(){n.find(".xccLoading").remove()})}XCC.define([],function(){return{content:n}})}(XCC,XCC.jQuery||jQuery)}]);