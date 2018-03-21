(function($, W) {
    "use strict";

    /**
     * Function which is called when the user edits the widget
     * @param  {[jQuery Object]} container$ [the HTML container in the Widget.. ]
     * @param  {[Object]} widgetData [The widget data]
     **/
    function myCustomEditor(container$, widgetData) {
        // get the saved settings, if any
        var savedSettings = XCC.T.getXccPropertyByName(
            widgetData,
            "myConfig"
        );
        var boxSettings = savedSettings
            ? JSON.parse(savedSettings) //JSON.parse(savedSettings.propValue)
            : undefined;
  
        var editFields = [
            XCC.U.createTextInputOnTheFly(
                "Widget Title ",
                widgetData.title,
                "title"
            ),
            XCC.U.createTextInputOnTheFly(
                "Height",
                widgetData.height,
                "height"
            )
        ];

        return editFields;
    }

    /**
     * Called when the user clicks the Save button in edit mode
     * @param  {[jQuery Object]} container$ [the HTML container in the Widget.. ]
     * @param  {[Object]} widgetData [The widget data]
     **/
    function save(container$, widgetData) {
        // find the new values in the container and save them
        widgetData.title = container$.find("input[name=title]").val();
        widgetData.height = container$.find("input[name=height]").val();

        var token = container$.find("input[id=tokenName]").val();
        boxConfig = {
            token: token
        };
        // persist the values as a property of this widget
        XCC.T.setXccPropertyString(
            widgetData,
            "myConfig",
            JSON.stringify(boxConfig)
        );
    }

    // this defines the above functions so they can be called from custom.js
    XCC.define([], function() {
        return {
            editor: editor,
            save: save
        };
    });
})(XCC.jQuery || jQuery, window);
