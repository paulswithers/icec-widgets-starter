(function ($, W) {
    "use strict";

    /**
    * called when the Widget is rendered.
    * @param  {[jQuery Object]} container$ [the HTML container in the Widget.. ]
    * @param  {[Object]} widgetData [The widget data]
    **/
    function vimeoContent(container$, widgetData) {
        var html = `Hello World`
        container$.html(html);
    }

    // this defines the above functions so they can be called from custom.js
    XCC.define([], function () {
        return {
            content: vimeoContent
        };
    });

}(XCC.jQuery || jQuery, window));