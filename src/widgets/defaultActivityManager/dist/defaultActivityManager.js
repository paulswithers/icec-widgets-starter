/*!
 
 Build Thu Feb 14 2019 11:26:06 GMT+0000 (Greenwich Mean Time) - 1.0.0

 Licensed under the  License

 Author: 
*/
!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/xcc/rest/public/custom/",t(t.s=0)}([function(e,t,n){"use strict";!function(e,t){function n(n,o){function a(e){if(!1===e.message)console.log("No data stored, searching for activities");else{e.message}}var c=function(e,t){return(r.getXccPropertyByName(o,e)||{}).propValue||t};Math.max(1,+c("pageSize",5)),Math.max(1,+c("feedSize",100)),Math.max(1,+c("fadeTime",200)),c("sortBy","title");n.html(e.U.createLoadingIcon());var i=e.P.getUserId();t.ajax({url:"/muse/data/get/portfolioActivities_"+i,cache:!1,contentType:"application/json"}).done(a).always(function(){n.find(".xccLoading").remove()})}var r=e.T;e.define([],function(){return{content:n}})}(XCC,XCC.jQuery||jQuery)}]);