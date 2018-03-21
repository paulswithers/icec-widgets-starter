const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appDir = path.resolve(__dirname, "");

const reponame = require("./package.json").name;
const version = require("./package.json").version;
const author = require("./package.json").author;
const license = require("./package.json").license;
const description = require("./package.json").description;

const banner = [
  "/*!",
  ` ${description}`,
  ` Build ${new Date()} - ${version}`,
  "",
  ` Licensed under the ${license} License`,
  "",
  ` Author: ${author}`,
  "*/"
].join("\n");

const devServer = require("../../../ngrok.json").https;
const customPath = "/xcc/rest/public/custom/";
var publicPath;
var buildDir;

if (process.env.NODE_ENV === "production") {
    publicPath = customPath;
    buildDir = path.resolve(__dirname, "./dist/");
} else {
    publicPath = devServer;
    buildDir = path.resolve(__dirname, "../../../build/public/");
}

var js_entry = `${appDir}/index.js`;
var js_filename = `${reponame}.js`;
var html_filename = `${reponame}.html`;

var config = {
    entry: js_entry,
    output: {
        filename: js_filename,
        path: buildDir,
        publicPath: publicPath
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["react", "env", "stage-2"]
                    }
                }
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: { importLoaders: 1 }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ filename: html_filename, template: "./index.html" }),
        
        new webpack.BannerPlugin({
            banner: banner,
            raw: true,
            entryOnly: true
        })
    ]
};

module.exports = config;
