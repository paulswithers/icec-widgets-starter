# icec-widgets-starter

### Launch your favorite IDE 
For this walkthrough we are assuming using Visual Studio Code, a free to download / use IDE available for Mac, Windows and Linux OS available here: Launch Visual Studio Code (https://code.visualstudio.com/)

TODO: Add image / screen shot

### Integrated Terminal

VS Code has an [integrated terminal](https://github.com/Microsoft/vscode-docs/blob/master/docs/editor/integrated-terminal.md) which you can use to run shell commands. You can run Node.js directly from there and avoid switching out of VS Code while running command line tools.

**View** > **Integrated Terminal** will open the integrated terminal and you can run `npm install`, `npm run build`, etc.. from there:

![integrated terminal](https://github.com/Microsoft/vscode-docs/blob/master/docs/nodejs/images/nodejs/integrated-terminal.png)

For this walkthrough, you can use either an external terminal or the VS Code integrated terminal for running the command line tools.

### Clone the starter repo

git clone https://github.com/icstechsales/icec-widgets-starter.git

### Initialize and start the Express Server

We will use an Express server to host our widgets during development and testing.  blah blah ...

cd icec-widgets-starter

npm install

npm run build

npm run start

Once the server is started you may receive a prompt to allow ngrok to be accessible via your desktop firewall, approve it. ngrok is a tunnel to your local Express server that will be hosting your widgets during development. 

### Build your first widget

npm run buildForm


### Edit the ICEC custom.js

Add the following entries to your ICEC custom.js in the init section, not only the lines that are added are shown for simplicity. View a more complete example of the custom.js here (/docs/images/customjs.png)

Substitute the value for the widgetServer to match the https url for your ngrok tunnel

```js
		init: function () {
            const widgetServer = "https://052040ed.ngrok.io";
            XCC.X.formReact(widgetServer);
		},
		formReact: function (widgetServer) {
			function content(container$, widgetData) {
				$.get(widgetServer + "/formreact/", function (data) {
					container$.html(data);
				})
			}
			XCC.W.registerCustomWidget("Form React", "table", content);
		},
```

