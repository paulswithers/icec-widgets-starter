---
title: Deploy
permalink: /docs/vimeo-deploy/
---

<a name="top"/>

###### 1. Register the widget

Return to Visual Studio Code and in the left navigation expand **src** > **widgets** and click on `custom.js` to open it.  

![edit customjs](../images/editcustomjs.png)

- Add the following script right below the cssgrid section we worked on earlier

```javascript
	XCC.X.vimeo = function (widgetPath) {
		function content(container$, widgetData) {
			XCC.require(["https://luwes.github.io/vimeowrap.js/vimeowrap.js"], function () {
				XCC.require(["https://luwes.github.io/vimeowrap.js/vimeowrap.playlist.js"], function () {
					XCC.require(["https://luwes.github.io/vimeowrap.js/vimeowrap.carousel.js"], function () {
						XCC.require([widgetPath + ".js"], function (vimeoWidget) {
								vimeoWidget.content(container$, widgetData);
						});
					});
				});
			});
		}

		XCC.W.registerCustomWidget("LAB8498 Vimeo", "table", content);
	};
```

Note 1 : Our widget will leverage open source libraries and we need to ensure that the libraries are loaded before we try to do anything.  ICEC provides the `requirejs` library already loaded, we just need to make use of it by calling XCC.require with the appropriate callback. 

Note 2: The vimeowrap library has mutiple plugins available, in order to use the plugins the main library `vimeowrap.js` mut be loaded first on the page. We can nest XCC.require statements to ensure the main library is loaded first and then the plugin.  

Note 3: Finally we require our own JS file, which when registered can be found either on our development server or the ICEC server, dependent on the variable we use under the init function of the custom.js as seen previously.  

The name of the widget is `vimeo` as seen from the line that starts with `XCC.X.vimeo = function() `.  We need to add that exact name to the appropriate variable.  This is a custom widget that is NOT replacing an existing ICEC widget.  We can add it to the `XCC.X.customWidgetsDEV` array.
<br/>

- Click on **File** > **Save** to save the update you just made.

Return to the ICEC page using your browser.

- Click on **Customize** > **Engagement Center Settings** > **Customization Files** > **Upload File** 
![upload customization](../images/upload-customization.png)

- Navigate to the location of the `custom.js` that you saved in an earlier step, select it and click on Open. You should receive a result similar to the screen below confirming the file was uploaded.

![upload customjs](../images/upload-customjs.png)
<br/>

###### 2. Add the vimeo widget to the Vimeo page

- Click on the nagivation link for Vimeo to be taken to that page. Validate by looking for the page title and the `?page=vimeo` in the URL displayed by the browser
- Click on **Customize** > **Widgets** > **Create Widget** 

<p>
<span class="label label-info">Warning</span>
If the widget does not show up in the list, bring up your developer console and reload the page after clearing the cache as was done in a previous exercise.
</p>

- Select the `LAB8498 Vimeo` widget from the list and in the ID field enter a unique name **LabVimeo** and click on **Create**.

The widget is added to the page and you can interact with the widget to play videos and cycle through the list.  

<br/>

###### 3. Modifying and updating the widget

Edit the `index.js` and change the plugin to use to `carousel`

change from 
```javascript
plugins: { 
    'playlist':{} 
}

```
change to 
```javascript
plugins: { 
    'carousel':{} 
} 

```
In order to make the updates to the widget available to ICEC we are going to run a `build` task that packages all the required files/changes and deploy them to our Development server under the `/build/public` directory and also under the `dist` directory. 

- Issue the following command from a terminal window while in `src/widgets/vimeo` directory.

```
npm run build
```

- Back to your browser, refresh the vimeo page to see the changes

You can now make updates to the widget as you iterate through your code, run a build process and test.  When you are ready to deploy to production, the following steps can be performed.

<br/>
###### 4. Deploying to Production

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