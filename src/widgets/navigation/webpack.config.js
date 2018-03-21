const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appDir = path.resolve(__dirname, "");

const reponame = require("../../../package.json").name;
const version = require("../../../package.json").version;
const author = require("../../../package.json").author;
const company = require("../../../package.json").company;
const contributors = require("../../../package.json").contributors;
const license = require("../../../package.json").license;
const description = require("../../../package.json").description;
const repository = require("../../../package.json").repository;
const bugs = require("../../../package.json").bugs;

const banner = [
  "/*!",
  ` ${description}`,
  ` Build ${new Date()} - ${version}`,
  "",
  ` Copyright (c) 2018-${new Date().getFullYear()} ${company}`,
  ` Licensed under the ${license} License`,
  ` Found in the repository ${repository.url}`,
  "",
  ` Author: ${author}`,
  ` Contributors: ${contributors[0].name} <${contributors[0].email}>`,
  "",
  ` Report bugs: ${bugs.url}`,
  "*/"
].join("\n");

const devServer = require("../../../ngrok.json").https;
const customPath = "/xcc/rest/public/custom/";
var publicPath;
var buildDir;

if (process.env.NODE_ENV === 'production') {
  publicPath = customPath;
  buildDir = path.resolve(__dirname, "./dist/");
} else {
  publicPath = devServer;
  buildDir = path.resolve(__dirname, "../../../build/public/");
}

var config = {
  entry: {
    navigation: appDir + "/index.js"
  },
  output: {
    filename: "[name].js",
    path: buildDir,
    publicPath: publicPath
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: appDir,
        loader: "babel-loader"
      },
      {
        test: /\.css?/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ filename: "navigation.html", template: "./index.html" }),
    new webpack.BannerPlugin({
      banner: banner,
      raw: true,
      entryOnly: true
    })
  ]
};

module.exports = config;
