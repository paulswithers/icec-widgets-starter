/*!
 
 Build Thu Feb 14 2019 12:24:30 GMT+0000 (Greenwich Mean Time) - 1.0.0

 Licensed under the  License

 Author: 
*/
!function(e){function t(a){if(n[a])return n[a].exports;var i=n[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/xcc/rest/public/custom/",t(t.s=0)}([function(e,t,n){"use strict";/**!
 * MyCommunities.js - IBM Connections Engagement Center (ICEC)
 *
 * <p>Displays the Communities of the current user</p>
 *
 * @version 1
 *
 * @copyright Copyright Paul Withers 2019 All Rights Reserved
 *
 * @authors Michael Gollmick (MGO), Paul Withers
 * @depends jQuery
 *****************************************************************************/
!function(e,t){function n(n,r){function c(e,r){var c=d.fadeTime,o=t(r),s=a.sanitizeHTML(o.find("snx\\:communityUuid").text()||""),l=a.assertCsrfToken(o.find("link[rel$=logo]").attr("href")||""),u=a.sanitizeHTML(o.find("summary[type=text]").text()||""),p=a.sanitizeHTML(o.find("title[type=text]").text()||""),f=o.find("link[rel=alternate][type$=html]").attr("href"),m=t("<a/>",{href:f,target:"_blank",rel:"noopener noreferrer tile",class:"btn btn-default xcc-tile",type:"button","data-index":e}),x=t('<div rel="toggle" class="xcc-tile-toggle"><a href="javascript:void(0)" class="fa fa-tag"></i></div>').appendTo(m),g=t('<div rel="slide-1" class="xcc-tile-slide-1"/>').appendTo(m),y=t('<div rel="slide-2" class="xcc-tile-slide-2"/>').hide().appendTo(m);i.indexOf(s)>-1&&(t('<img alt="" width="150" height="150" border="0" class="xcc-tile-image"/>').attr("src",a.anonymizeLocalUrl(l)).appendTo(g),t('<span class="xcc-tile-title"/>').text(p).appendTo(g),t('<span class="xcc-tile-summary-title"/>').text(p).appendTo(y),y.append("<br>"),t('<span class="xcc-tile-summary-body"/>').text(u).appendTo(y),x.on("click",function(e){var t=g,n=y;e.preventDefault(),g.is(":visible")||(t=y,n=g),t.fadeOut(c,function(){n.fadeIn(c)})}),m.appendTo(t("<span/>",{rel:"entry"}).appendTo(n)))}function o(e){var i;t(e).find("entry").each(c),i=function(e,t){var n=new RegExp("^-?\\d+(?:.\\d{0,"+(t||-1)+"})?");return e.toString().match(n)[0]}(n.width()/180,0),a.createPager({entries:n.find("[rel=entry]"),parent:n,pagesize:d.pageSize}),n.addClass("xccMyCommunities xccGrid"+i).fadeIn().submenu(".xcc-tile-toggle",".xcc-tile"),n.find("[rel=entry]").css("width","calc("+100/i+"% - 10px)")}function s(e){!1===e.message?(console.log("No favourites stored"),t("<center><h3>You have not stored any favourites</h3></center>").appendTo(n)):(i=e.message,t.ajax({url:a.getRootPath("Communities")+"/service/atom/communities/my",data:{sortBy:d.sortBy,asc:!0,ps:d.feedSize}}).done(o))}var l=function(e,t){return(a.getXccPropertyByName(r,e)||{}).propValue||t},d={pageSize:Math.max(1,+l("pageSize",5)),feedSize:Math.max(1,+l("feedSize",100)),fadeTime:Math.max(1,+l("fadeTime",200))};n.html(e.U.createLoadingIcon());var u=e.P.getUserId();t.ajax({url:"/muse/data/get/favorite_communities_"+u,cache:!1,contentType:"application/json"}).done(s).always(function(){n.find(".xccLoading").remove()})}var a=e.T,i=[];e.define([],function(){return{content:n}})}(XCC,XCC.jQuery||jQuery)}]);