/*! ****************************************************************************
 * ICEC - IBM Connections Engagement Center Custom Widgets Lab
 *
 * Build date: 2018-Mar-18
 * Version: 1.0.0
 * Project name: Project-Template
 * Author: ICS TechSales
 *
 **************************************************************************** */
(function (W) {
	var localizeString;
	var devServer = "https://f49c6eba.ngrok.io/";  //Change to match your development server's url
	var customPath = "/xcc/rest/public/custom/";

	XCC.X = XCC.X || {};

	/* Please enter your custom widget name(s) into the appropriate array below. They will be directly initialized by the XCC.X.init function */

	// These should custom Widgets you created and/or are making available.
	XCC.X.customWidgetsDEV = [
		"vimeo",
		"cssgrid",
		"defaultActivityManager",
		"basicMuse"
	];

	// These should out of the box widgets that you are replacing (overriding) with your own (can be derivative work or new). Example: "communityOverview"
	XCC.X.replaceWidgetsDEV = [
	];  

	// These should custom Widgets you created and/or are making available.
	XCC.X.customWidgetsPROD = [ 
		"navigation",
	];  

	// These should out of the box widgets that you are replacing (overriding) with your own (can be derivative work or new). Example: "communityOverview"
	XCC.X.replaceWidgetsPROD = [
	];  
	
	/* Init function, please use this function as your constructor */
	XCC.X.init = function () {

		try {
			localizeString = XCC.L.get;
			
			/**  Develpment Widgets Section **/
			// initialize customWidgets, if they are defined
			$.each(XCC.X.customWidgetsDEV || [], function (i, widgetName) {
				XCC.X[widgetName](devServer + widgetName ); //XCC.X.HelloWorld();
			});

			// calculate path of customModules. Here we need to follow a name convention: All replaced Modules have the name "CUSTOM-<Originalname>"
			var tempModuleObject = {};
			$.each(XCC.X.replaceWidgetsDEV || [], function (i, val) {
				var originalName = XCC.requirejs.s.contexts._.config.paths[val].split("/").pop(),
					newName = "CUSTOM-" + originalName;
				tempModuleObject[val] = devServer + newName;
			});
			$.extend(XCC.requirejs.s.contexts._.config.paths, tempModuleObject); // now we replace the original paths with our new Custom-paths

			/** Production Widgets Section **/
			// initialize customWidgets, if they are defined
			$.each(XCC.X.customWidgetsPROD || [], function (i, widgetName) {
				XCC.X[widgetName](customPath + widgetName); //XCC.X.HelloWorld();
			});

			// calculate path of customModules. Here we need to follow a name convention: All replaced Modules have the name "CUSTOM-<Originalname>"
			var tempModuleObject = {};
			$.each(XCC.X.replaceWidgetsPROD || [], function (i, val) {
				var originalName = XCC.requirejs.s.contexts._.config.paths[val].split("/").pop(),
					newName = "CUSTOM-" + originalName;
				tempModuleObject[val] = customPath + newName;
			});
			$.extend(XCC.requirejs.s.contexts._.config.paths, tempModuleObject); // now we replace the original paths with our new Custom-paths
		}
		catch(err) {
			console.log("An error occurred in custom.js, review the following error for details.")
			console.log(err);
			return;
		}
	};

	XCC.X.navigation = function (widgetPath) {
		function content(container$, widgetData) {
			$.get(widgetPath + ".html", function (data) {
				container$.html(data);
			})
		}
		XCC.W.registerCustomWidget("LAB8498 Navigation", "th", content);
	};

	XCC.X.helloWorld = function () {
		/**
		* Function which is called when the Widget is rendered.
		* @param  {[Jquery-Object]} container$ [the HTML-container in the Widget.. ]
		* @param  {[Object]} widgetData [The widget data]
		* */
		function myCustomWidget(container$, widgetData) {
			XCC.require(["profiles"], function () {
				var profile = XCC.P.getProfile();
				var name = profile.getName();
				var picture = profile.getImageUrl();
				var email = profile.getEmail();
				var phoneNumber = profile.getPhoneNumber();
				var title = profile.getTitle();
		
				var html = `
						<div class="col-xs-12 col-sm-12 col-md-12 col-md-offset-3">
							<div class="well well-sm">
								<div>
									<div class="col-sm-4">
										<img src=${picture} alt="" class="img-rounded img-responsive" />
									</div>
									<div class="col-sm-8">
										<h4>Hello ${name}</h4>
										<small style="display: block; color: #888;"><div title="San Diego, USA">San Diego, USA</div></small>
										<p >
											${title}
											<br />
											${phoneNumber}
											<br />
											${email}
										</p>
										<div class="btn-group">
											<a href="#" class="btn btn-primary"><span class="fa fa-2x fa-facebook"></span></a>
											<a href="#" class="btn btn-primary"><span class="fa fa-2x fa-google"></span></a>
											<a href="#" class="btn btn-primary"><span class="fa fa-2x fa-twitter"></span></a>
											<a href="#" class="btn btn-primary"><span class="fa fa-2x fa-linkedin"></span></a>
										</div>
										</div>
									</div>
								</div>
							</div>
					`
				container$.html(html);
			});
		}

		/**
		* The myCustomEditor will be called immediately if the editor is opened.
		* You have to code here your html-code for the editor.
		* Default is only a save button.
		*
		* @param container$ {jQuery} the parent node that will hold the editor
		* @param widgetData {Object} the widget object to work on
		*
		* @return a HTML-String, Jquery-Objekt or an array of Jquery-Objects!
		* */
		function myCustomEditor(container$, widgetData) {
			return [XCC.U.createTextInputOnTheFly("Widget Title ", widgetData.title, "title"),
			XCC.U.createTextInputOnTheFly("Height", widgetData.height, "height")];
		}

		/**
		* Function to synch the UI-Data to the widget.
		* @param  {[type]} container$ [the Editor as a Jquery-Object]
		* @param  {[type]} widgetData  [the widget data]
		*/
		function save(container$, widgetData) {
			widgetData.title = container$.find("input[name=title]").val();
			widgetData.height = container$.find("input[name=height]").val();
		}

		/**
		* This function is used to register a Custom Widget
		* @param name {String} Name of the Custom Widget,
		*  which is shown in the Create-Widget ModalBox
		* @param icon {String} name of the icon. Without the "fa-" at the beginning.
		* You have to use the fontawesome.io library.
		* @param createCustomWidget {function} Function which should be called when rendering
		* the Widget
		* @param CreateCustomEditor {function} optional: Use an own Editor instance!
		* @param synchUiToWidgetDataObjekt {function} optional: Synch your Data from the UI into the Widget.
		* @param dontShowIn {String} optional: e.g.: Should not show in ":cloud:communites:cnx5:"
		*/
		XCC.W.registerCustomWidget("LAB8498 Hello World", "flag", myCustomWidget, myCustomEditor, save);
	};
	
	XCC.X.cssgrid = function (widgetPath) {
		function content(container$, widgetData) {
			$.get(widgetPath + ".html", function (data) {
				container$.html(data);
			})
		}
		XCC.W.registerCustomWidget("LAB8498 CSS Grid", "th", content);
	};

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

	XCC.X.defaultActivityManager = function (widgetPath) {
		function content(container$, widgetData) {
			XCC.require([widgetPath + ".js"], function (defaultActivityManager) {
				defaultActivityManager.content(container$, widgetData);
			});
		}

		XCC.W.registerCustomWidget("Default Activities", "table", content);
	};

	XCC.X.basicMuse = function (widgetPath) {
		function content(container$, widgetData) {
			XCC.require([widgetPath + ".js"], function (basicMuse) {
				basicMuse.content(container$, widgetData);
			});
		}

		XCC.W.registerCustomWidget("Basic Muse", "table", content);
	};
			
	XCC.X.activityWidget = function (widgetPath) {
		function createActivityWidget(container$, widgetData) {
			XCC.require(["/xcc/rest/public/custom/CreateActivity.js"], function(createActivityWidget) {
			   new createActivityWidget(container$);
			});
		}
		XCC.W.registerCustomWidget("CreateActivity", "quote-right", createActivityWidget);
	};


}(window));