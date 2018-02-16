var path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, "../../../build/public/formreact");
var APP_DIR = path.resolve(__dirname, "");

const name = require("../../../package.json").name;
const version = require("../../../package.json").version;
const author = require("../../../package.json").author;
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
    ` Copyright (c) 2017-${new Date().getFullYear()} IBM`,
    ` Licensed under the ${license} License`,
    ` ${repository.url}/${name}`,
    "",
    ` Author: ${author}`,
    ` Contributors: ${contributors[0].name} <${contributors[0].email}>`,
    "",
    ` Report bugs: ${bugs.url}`,
    "*/"
  ].join("\n");

const ngrok = require("../../../ngrok.json").https;

var config = {
  entry: APP_DIR + "/index.js",
  output: {
    filename: "js/bundle.js",
    path: BUILD_DIR,
    publicPath: ngrok + "/formreact/"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: "babel-loader"
      },
      {
        test: /\.css?/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/widgets/form-react/index.html"
    }),
    new webpack.BannerPlugin({
      banner: banner,
      raw: true,
      entryOnly: true
    }),
    // new webpack.DefinePlugin({
    //   "process.env": {
    //     NODE_ENV: JSON.stringify("production")
    //   }
    // }),
    // new webpack.optimize.UglifyJsPlugin()
  ]
};


module.exports = config;
