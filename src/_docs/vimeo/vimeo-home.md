---
title: Build
permalink: /docs/vimeo-home/
---

<a name="top"/>

We are going to build a widget to access videos from Vimeo.  This exercise is going to help us get familiar with how to access external content leveraging open source libraries and using jQuery.

###### 1. Create a new widget

We will now create a new widget and name it `vimeo`, the name is important to follow along in the exercises.  In a Visual Studio Code terminal window make sure that you are in the `icec-widgets-starter` directory.

- issue the following command:

```
node scripts/createWidget.js vimeo jquery
```

<br/>
![create widget](../images/createwidget.png)
<br/>

###### 2. Initialize the widget

The default widget comes with a set of JavaScript modules and build tools pre-configured.  We need to install them.  Switch to directory that was just created

- run `npm install`

```
cd src/widgets/vimeo

npm install
```
<br/>
###### 3. Adding sample code to the cssgrid widget

In the left navigation for Visual Studio code, expand the `src/widgets/vimeo` folder, if you do not see the vimeo folder, click on the refresh icon on the top right to update your folder list.

![edit cssgrid widget](../images/editcssgrid.png)

- Click on the `index.js` to modify it.  Does this look familiar?  Copy and paste the following javascript to replace the `var html = Hello World`

```javascript
        var html = `
            <div id='player'> 
            </div> 
            <script> 
            vimeowrap('player').setup({ 
                urls: [ 
                    'https://vimeo.com/user3709818', 
                ], 
                plugins: { 
                    'playlist':{} 
                } 
            }); 
            </script>
        `
```

- The above script snippet is from an open source librarie that you can get more details from this [website](https://wesleyluyten.com/projects/vimeo-wrap)

- Save the file.

###### 4. Build the widget

In order to make the widget available to ICEC we are going to run a `build` task that packages all the required files and deploy them to our Development server under the `/build/public` directory and also under the `dist` directory. 

- Issue the following command from a terminal window while in `src/widgets/vimeo` directory.

```
npm run build
```

- From the Visual Studio Code Explorer on the left panel, navigate to the `src/widgets/vimeo/dist` and review the files there.  

- Repeat the above step for the `build/public` folder

- This widget is pure JavaScript with the html code inside of it, so only the js files are produced.
