/**!
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
/*jslint browser:true,white:true,multivar:true,this:true,fudge:true,single:true*/
/*global XCC, jQuery, window */
/*exported renderBusinessCard */
(function ($, W) {
	"use strict";

	var X = (function () { W.XCC = W.XCC || {}; return W.XCC; }()); // get or create and expose the XCC Object

	// define this function in dependency of nothing else
	X.define([], function () {
		function renderBusinessCard(conf) {
			var fa$ = X.T.fa$,
				confParent$ = $(conf.parent),
				t$ = $(conf.atomNode).find("content").first(),
				userData = { // create a userdata object holding some information about the found user
					img: X.T.anonymizeLocalUrl(t$.find("img.photo").attr("src").split("&")[0], X.S.anon), //with the caching param, images in IE9 does not work #4271
					tel: t$.find(".tel [title=work]").parent().find(".value").text(),
					cell: t$.find(".tel [title=cell]").parent().find(".value").text(),
					job: t$.find(".title").text(),
					office: t$.find(".x-office .x-office-number").text(),
					floor: t$.find(".x-office .x-floor").text(),
					building: t$.find(".x-office .x-building").text(),
					email: t$.find(".email").text(),
					uid: t$.find(".uid").text(),
					name: t$.find("a.fn.url").first().text()
				},
				link = X.T.getRootPath("Profiles", true) + "/html/profileView.do?userid=" + userData.uid,
				line1$ = $("<div></div>", { rel: "l1" }),
				line2$ = $("<div></div>", { rel: "l2" }),
				line3$ = $("<div></div>", { rel: "l3" }),
				line4$ = $("<div></div>", { rel: "l4" }),
				list$ = $('<span role="list" class="lotusLeft"></span>'),
				name$ = $('<h4 class="pf-name lotusLeft"></h4>')
					.text(userData.name),
				img$ = !userData.img ? null : $('<img class="pf-img">')
					.attr({
						"data-src": userData.img,
						"alt": userData.name
					}),
				link$ = $('<a/>', {
					"class": "clearfix",
					"role": "link",
					"aria-label": X.L.get("aria_profile_link", "Link to Profile of $1", userData.name),
					"target": "_blank",
					"rel": "noopener noreferrer",
					"href": link
				})
					.append(
						$("<div/>")
							.addClass("image-container")
							.append(img$),
						$("<div/>")
							.addClass("information-container")
							.append(list$.append(name$, line1$, line2$, line3$, line4$))
					),
				entry$ = $("<div/>")
					.addClass("pf-result-entry")
					.hide()
					.append(link$);

			if (userData.job) {
				line1$.append($('<span class="pf-job bidi-btd"></span>')
					.text(userData.job));
			}

			if (userData.email) {
				line2$.append($('<span class="pf-mail"></span>')
					.append($("<a></a>", {
						href: "mailto:" + userData.email,
						"class": "ellipsis"
					}).text(userData.email)));
			}

			var sname = userData.email;
			sname = sname.split("@")[0];

			$.get('https://f49c6eba.ngrok.io/regions?shortName=' + sname, function (data) {
				if (typeof data[0] !== 'undefined') {
					line3$.append($('<div class="pf-region"></div>')
						.append(data[0].region));
				}
			});


			if (userData.office) {
				line4$.append($('<span class="pf-office bidi-btd"></span>')
					.text(userData.office));
			}
			// if user is inactive!
			if ($(conf.atomNode).find("contributor").find("userState, snx\\:userState").text() === "inactive") {
				entry$.addClass("opacity50");
			}
			// finally append the entry$ to the parent div if it is given
			// return entry$ equally if it was appended or not
			return conf.parent ? entry$.appendTo(confParent$) : entry$;
		} // END renderBusinessCard


		// expose functions
		return renderBusinessCard;
	}); // END X.define
}(XCC.jQuery || jQuery, window));
