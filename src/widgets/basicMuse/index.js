(function (X, $) {
	"use strict";

    /**
    * called when the Widget is rendered.
    * @param  {[jQuery Object]} container$ [the HTML container in the Widget.. ]
    * @param  {[Object]} widgetData [The widget data]
    **/
	function baseMuseContent(container$, widgetData) {
		container$.html(X.U.createLoadingIcon());
		let bodyData = {
			"script-name": "paultest_22597525",
			"client-data": {
				"firstValue": "test1",
				"secondValue": "test2"
			}
		};
		$.ajax({
			url: "/muse/data/post",
			headers: { "Content-Type": "application/json" },
			method: "POST",
			data: JSON.stringify(bodyData);
		}).done(function (responseText) {
			console.log(JSON.stringify(responseText));
			if (responseText.message === "MUSE data saved") {
				console.log("Successfully saved to MUSE proxy");
			} else {
				console.log("Failed to save activities to MUSE proxy: " + responseText.message);
			}
			var html = "<div>Response from MUSE: " + JSON.stringify(responseText) + "</div>";
			container$.html(html);
		}).fail(function (msg) {
			X.console.error(msg);
		}).always(function () {
			container$.find(".xccLoading").remove();
		});
	}

	// this defines the above functions so they can be called from custom.js
	XCC.define([], function () {
		return {
			content: baseMuseContent
		};
	});

}(XCC, XCC.jQuery || jQuery));
