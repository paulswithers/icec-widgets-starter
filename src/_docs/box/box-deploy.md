---
title: Deploy
permalink: /docs/box-deploy/
---

<a name="top"/>

###### 1. Register the widget

Return to Visual Studio Code and in the left navigation expand **src** > **widgets** and click on `custom.js` to open it.  

- Add the following script right below the vimeo section we worked on earlier

```javascript
	XCC.X.box = function (widgetPath) {

		function content(container$, widgetData) {
			$.get(widgetPath + ".html", function (data) {
				container$.html(data);
			})
		}

		XCC.W.registerCustomWidget("LAB8498 Box", "box", content);
	};
```

The name of the widget is `box` as seen from the line that starts with `XCC.X.box = function() `.  We need to add that exact name to the appropriate variable.  This is a custom widget that is NOT replacing an existing ICEC widget.  We can add it to the `XCC.X.customWidgetsDEV` array.
<br/>

- Click on **File** > **Save** to save the update you just made.

Return to the ICEC page using your browser.

- Click on **Customize** > **Engagement Center Settings** > **Customization Files** > **Upload File** 

- Navigate to the location of the `custom.js` that you saved in an earlier step, select it and click on Open. You should receive a result similar to the screen below confirming the file was uploaded.

<br/>

###### 2. Add the box widget to the Box page

- Click on the nagivation link for Box to be taken to that page. Validate by looking for the page title and the `?page=box` in the URL displayed by the browser
- Click on **Customize** > **Widgets** > **Create Widget** 

<p>
<span class="label label-info">Warning</span>
If the widget does not show up in the list, bring up your developer console and reload the page after clearing the cache as was done in a previous exercise.
</p>

- Select the `LAB8498 Box` widget from the list and in the ID field enter a unique name **LabBox** and click on **Create**.

The widget is added to the page and you can interact with the widget to play videos and cycle through the list.  

<br/>

###### 3. Add Edit capability to the widget

The token to acces the Box folder is hard coded in the widget, but we would like to make it editable. As we saw with the Hello World example, you can add an edit and save dialog to the widgets.  Let's try to do the same here for the token. 

- Edit the `custom.js`, and add the following code to the box widget section, right below the `function content (...)` and redeploy it as we have done previously.

```javascript
		
		var boxConfig = {
			token: ''
		};
		
		function editor(container$, widgetData) {
			// get the saved settings, if any
			var savedSettings = XCC.T.getXccPropertyByName(
				widgetData,
				"boxConfig"
			);

			var boxSettings = savedSettings
				? JSON.parse(savedSettings.propValue) //JSON.parse(savedSettings.propValue)
				: {token: ''};
		
			var editFields = [
				$('<label><div class="input-group"><span class="input-group-addon"><span class="xccEllipsis" style="float: left;">Token' +
						'</span></span>' +
						'<input value="' + boxSettings.token + '" type="text" id="tokenName" class="form-control xccEllipsis ui-autocomplete-input formInput" autocomplete="off"></div></label>')
			];
	
			return editFields;
		}

		function save(container$, widgetData) {
			var token = container$.find("input[id=tokenName]").val();
			boxConfig = {
				token: token
			};
			// persist the values as a property of this widget
			XCC.T.setXccPropertyString(
				widgetData,
				"boxConfig",
				JSON.stringify(boxConfig)
			);
		}

		XCC.W.registerCustomWidget("LAB8498 Box", "box", content, editor, save);
```
The two new function added `editor` and `save` allows us to offer a field to type in the token to configure the widget'

- Edit the `index.js` and replace the entire content with the following:

```javascript

import React from "react";
import { render } from "react-dom";
import App from "./components/App";

const container = document.querySelector(".boxcontainer")

let token;
if (typeof XCC !== 'undefined') {
    var data = XCC.C.data.widget;
    var widgetData = data.find(function(obj) {
        return obj.contentType === "LAB8498 Box";
    });

    const savedSettings = XCC.T.getXccPropertyByName(widgetData, "boxConfig");

    var boxSettings = savedSettings
        ? JSON.parse(savedSettings.propValue)
        : { token: "" };

    token = boxSettings.token;
} else {
    token = "";
}

render(<App token={token} />, container);
```



<br/>
###### 5. Deploying to Production

Now that you have completed development of your widget, you want to deploy it to the ICEC server.  Everytime you run a build process the minified version of your code is added to the `dist` folder.  You can take all the files from that directory and upload them to the ICEC server under customization.  

To switch from your development server to the ICEC server for serving the files, update the `custom.js` file and switch the location of the widget registration from the `XCC.X.customWidgetsDEV` array to the `XCC.X.customWidgetsPROD`.  

```javascript
	// These should custom Widgets you created and/or are making available.
	XCC.X.customWidgetsDEV = [
	];

	// These should out of the box widgets that you are replacing (overriding) with your own (can be derivative work or new). Example: "communityOverview"
	XCC.X.replaceWidgetsDEV = [
	];  

	// These should custom Widgets you created and/or are making available.
	XCC.X.customWidgetsPROD = [ 
		"navigation",
		"helloWorld",
        "cssgrid",
        "vimeo"
	];  
```

Refresh your browser cache and the widget will load from the ICEC server instead of your development server