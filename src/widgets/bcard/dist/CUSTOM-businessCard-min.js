/*!
 
 Build Tue Feb 12 2019 11:39:38 GMT+0000 (Greenwich Mean Time) - 1.0.0

 Licensed under the  License

 Author: 
*/
!function(e){function t(n){if(i[n])return i[n].exports;var a=i[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var i={};t.m=e,t.c=i,t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/xcc/rest/public/custom/",t(t.s=0)}([function(e,t,i){"use strict";/**!
 * BusinessCard.js - IBM Connections Engagement Center (ICEC)
 *
 * <p>Renders a single response entry created form a DOMNode from the ATOM
 * Docuement.</p>
 *
 * @param atomNode the Atom Node containing the response to be rendered
 * conf = {
 *     atomNode : {ATOMNode} the Atom Node or document containing the response to be rendered
 *     parent : {DOMNode} the DOMNode to append the Businesscard to
 *     profilesRoot : {string} (OPTIONAL) the computed root path variable of the PROFILES application
 * }
 *
 * @copyright Copyright IBM Corp. 2017, 2018 All Rights Reserved
 *
 * @author Michael Gollmick(MGO)
 * @depends jQuery
 *****************************************************************************/
!function(e,t){var i=function(){return t.XCC=t.XCC||{},t.XCC}();i.define([],function(){function t(t){var n=(i.T.fa$,e(t.parent)),a=e(t.atomNode).find("content").first(),r={img:i.T.anonymizeLocalUrl(a.find("img.photo").attr("src").split("&")[0],i.S.anon),tel:a.find(".tel [title=work]").parent().find(".value").text(),cell:a.find(".tel [title=cell]").parent().find(".value").text(),job:a.find(".title").text(),office:a.find(".x-office .x-office-number").text(),floor:a.find(".x-office .x-floor").text(),building:a.find(".x-office .x-building").text(),email:a.find(".email").text(),uid:a.find(".uid").text(),name:a.find("a.fn.url").first().text()},o=i.T.getRootPath("Profiles",!0)+"/html/profileView.do?userid="+r.uid,l=e("<div></div>",{rel:"l1"}),f=e("<div></div>",{rel:"l2"}),d=e("<div></div>",{rel:"l3"}),s=e("<div></div>",{rel:"l4"}),p=e('<span role="list" class="lotusLeft"></span>'),c=e('<h4 class="pf-name lotusLeft"></h4>').text(r.name),u=r.img?e('<img class="pf-img">').attr({"data-src":r.img,alt:r.name}):null,m=e("<a/>",{class:"clearfix",role:"link","aria-label":i.L.get("aria_profile_link","Link to Profile of $1",r.name),target:"_blank",rel:"noopener noreferrer",href:o}).append(e("<div/>").addClass("image-container").append(u),e("<div/>").addClass("information-container").append(p.append(c,l,f,d,s))),x=e("<div/>").addClass("pf-result-entry").hide().append(m);r.job&&l.append(e('<span class="pf-job bidi-btd"></span>').text(r.job)),r.email&&f.append(e('<span class="pf-mail"></span>').append(e("<a></a>",{href:"mailto:"+r.email,class:"ellipsis"}).text(r.email)));var v=r.email;return v=v.split("@")[0],e.get("https://f49c6eba.ngrok.io/regions?shortName="+v,function(t){void 0!==t[0]&&d.append(e('<div class="pf-region"></div>').append(t[0].region))}),r.office&&s.append(e('<span class="pf-office bidi-btd"></span>').text(r.office)),"inactive"===e(t.atomNode).find("contributor").find("userState, snx\\:userState").text()&&x.addClass("opacity50"),t.parent?x.appendTo(n):x}return t})}(XCC.jQuery||jQuery,window)}]);