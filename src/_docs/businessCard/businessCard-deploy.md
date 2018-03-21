---
title: Deploy
permalink: /docs/businessCard-deploy/
---

<a name="top"/>

###### 1. Register the widget

Return to Visual Studio Code and in the left navigation expand **src** > **widgets** and click on `custom.js` to open it. 

The name of the widget is `CUSTOM-businessCard` as seen from name of the Javascript file we created.  We need to add that name to the appropriate variable without the `CUSTOM-` prefix.  This is a widget that is currently provided by ICEC, and we going to override it with our custom version.  We can add it to the `XCC.X.replaceWidgetsDEV` array.
<br/>

- Click on **File** > **Save** to save the update you just made.

Return to the ICEC page using your browser.

- Click on **Customize** > **Engagement Center Settings** > **Customization Files** > **Upload File** 

- Navigate to the location of the `custom.js` that you saved in an earlier step, select it and click on Open. You should receive a confirmation the file was uploaded.

<br/>

###### 2. Refresh the page

The BusinessCard is used in the People Selector widget we previously added to the page, we need to Clear Cache and Hard Reload to get the updated version of the BusinessCard and validate the results.


<br/>
###### 3. Deploying to Production

Now that you have completed development of your widget, you want to deploy it to the ICEC server.  Everytime you run a build process the minified version of your code is added to the `dist` folder.  You can take all the files from that directory and upload them to the ICEC server under customization.  

To switch from your development server to the ICEC server for serving the files, update the `custom.js` file and switch the location of the widget registration from the `XCC.X.replaceWidgetsDEV` array to the `XCC.X.replaceWidgetsPROD`.  

Refresh your browser cache and the widget will load from the ICEC server instead of your development server


