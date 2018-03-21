"use strict";
const path = require("path");
const chalk = require("chalk");
const fs = require("fs-extra");

const settings = require("./settings");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const appHtml = resolveApp("public/index.html");

const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");

process.on("unhandledRejection", err => {
  throw err;
});

if (!process.argv[2]) {
  console.log(chalk.red('\nYou must specify an application name.'));

  console.log("\nThis script accepts two parameters.  You can specify: " + 
  chalk.cyan('<appName> <template>\n') + 'appName: is required input');

  console.log("\ntemplate: is optional and can be 1 of 3 available options: " +
  chalk.underline(chalk.yellow('html')) + ',' + chalk.underline(chalk.yellow('jquery')) + ',' + chalk.underline(chalk.yellow('react')));
  process.exit(1);
}

const appName = process.argv[2];

const appSrc = resolveApp("src/widgets/" + appName);

var appTemplate = resolveApp("templates");

if (process.argv[3] && process.argv[3] === "custom") {
  appTemplate = resolveApp("templates/custom");
} else if (process.argv[3] && process.argv[3] === "html") {
  appTemplate = resolveApp("templates/html");
} else if (process.argv[3] && process.argv[3] === "jquery") {
  appTemplate = resolveApp("templates/jquery");
} else if (process.argv[3] && process.argv[3] === "react") {
  appTemplate = resolveApp("templates/react");
} else {
  console.log("\nThere was no template specified, using html.  In the future you can specify: " +
  chalk.underline(chalk.yellow('custom')) + ',' + 
  chalk.underline(chalk.yellow('html')) + ',' + 
  chalk.underline(chalk.yellow('jquery')) + ',' + 
  chalk.underline(chalk.yellow('react')));

  appTemplate = resolveApp("templates/html");
}

if (checkRequiredFiles([appSrc + "/package.json" , appSrc + "/webpack.config.js"])) {
  console.log(chalk.red('Destination directory already exist.\n'));
  process.exit(1);
} else {
  console.log(chalk.green('\nThe above message can be ignored and will be removed in the next version of this file.\n'));
}

fs.copySync(appTemplate, appSrc, {
  dereference: true,
  filter: file => file !== appHtml
});

function saveSettings(settingsFile, settingKey, settingValue) {
  const nconf = require('nconf').file(settingsFile);
  
  nconf.set(settingKey, settingValue);
  nconf.save();
}

settings.saveSettings(appSrc + "/package.json", "name", appName);

console.log(chalk.green('\nYour widget was created switch to the it by issuing the following command.\n'));
console.log(chalk.cyan('cd src/widgets/' + appName));

