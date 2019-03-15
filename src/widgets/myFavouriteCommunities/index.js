/**!
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
/*jslint browser:true,white:true,multivar:true*/
/*global XCC, jQuery*/
/*exported createMyFavouriteCommunities*/
(function (X, $) {
	"use strict";

	var xccTools = X.T;
	var favouriteCommunities = [];

	function createMyFavouriteCommunities(container$, data) {
		X.require(["profiles"], function () {
			var getProp = function (key, defVal) {
				var prop = (xccTools.getXccPropertyByName(data, key) || {});
				return prop.propValue || defVal;
			},
				conf = {
					pageSize: Math.max(1, +getProp("pageSize", 5)),
					feedSize: Math.max(1, +getProp("feedSize", 100)), // unused - this value is currently not set by the editor
					fadeTime: Math.max(1, +getProp("fadeTime", 200)), // unused - this value is currently not set by the editor
				};

			function renderTile(i, entry) {
				var ft = conf.fadeTime,
					entry$ = $(entry),
					id = xccTools.sanitizeHTML(entry$.find("snx\\:communityUuid").text() || ""),
					img = xccTools.assertCsrfToken(entry$.find("link[rel$=logo]").attr("href") || ""),
					summary = xccTools.sanitizeHTML(entry$.find("summary[type=text]").text() || ""),
					title = xccTools.sanitizeHTML(entry$.find("title[type=text]").text() || ""),
					link = entry$.find("link[rel=alternate][type$=html]").attr("href"),
					tile$ = $("<a/>", {
						"href": link,
						"target": "_blank",
						"rel": "noopener noreferrer tile",
						"class": "btn btn-default xcc-tile",
						"type": "button",
						"data-index": i
					}),
					toggle$ = $('<div rel="toggle" class="xcc-tile-toggle"><a href="javascript:void(0)" class="fa fa-tag"></i></div>').appendTo(tile$),
					slide1$ = $('<div rel="slide-1" class="xcc-tile-slide-1"/>').appendTo(tile$),
					slide2$ = $('<div rel="slide-2" class="xcc-tile-slide-2"/>').hide().appendTo(tile$);
				if (favouriteCommunities.indexOf(id) > -1) {
					$('<img alt="" width="150" height="150" border="0" class="xcc-tile-image"/>').attr("src", xccTools.anonymizeLocalUrl(img)).appendTo(slide1$);
					$('<span class="xcc-tile-title"/>').text(title).appendTo(slide1$);
					$('<span class="xcc-tile-summary-title"/>').text(title).appendTo(slide2$);
					slide2$.append('<br>');
					$('<span class="xcc-tile-summary-body"/>').text(summary).appendTo(slide2$);
					toggle$.on("click", function (e) {
						var one$ = slide1$,
							two$ = slide2$;
						e.preventDefault();
						if (!slide1$.is(":visible")) {
							one$ = slide2$;
							two$ = slide1$;
						}
						one$.fadeOut(ft, function () {
							two$.fadeIn(ft);
						});
					});
					tile$.appendTo($("<span/>", {
						rel: "entry"
					}).appendTo(container$));
				}
			} // END renderTile


			function render(doc) {
				var gridNum;
				$(doc).find("entry").each(renderTile);
				//get fixed number of gridCols without rounding!
				gridNum = (function toFixed(num, fixed) {
					var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
					return num.toString().match(re)[0];
				})(container$.width() / 180, 0);
				xccTools.createPager({
					entries: container$.find("[rel=entry]"),
					parent: container$,
					pagesize: conf.pageSize
				});
				container$.addClass("xccMyCommunities xccGrid" + gridNum).fadeIn().submenu(".xcc-tile-toggle", ".xcc-tile");
				container$.find("[rel=entry]").css("width", "calc(" + (100 / gridNum) + "% - 10px)");
			} // END render

			function checkFavouritesToRender(response) {
				if (response.message === false) {
					console.log("No favourites stored");
					$("<center><h3>You have not stored any favourites</h3></center>").appendTo(container$);
				} else {
					favouriteCommunities = response.message;
					$.ajax({
						url: xccTools.getRootPath("Communities") + "/service/atom/communities/my",
						data: {
							sortBy: conf.sortBy,
							asc: true,
							ps: conf.feedSize
						}
					})
						.done(render);
				}
			}


			container$.html(X.U.createLoadingIcon());
			var profileId = X.P.getUserId();
			$.ajax({
				url: "/muse/data/get/favorite_communities_" + profileId,
				cache: false,
				contentType: "application/json"
			})
				.done(checkFavouritesToRender)
				.always(function () {
					container$.find(".xccLoading").remove();
				});
		});
	} // END createMyCommunities


	X.define([], function () {
		return {
			content: createMyFavouriteCommunities
		};
	});

}(XCC, XCC.jQuery || jQuery));
