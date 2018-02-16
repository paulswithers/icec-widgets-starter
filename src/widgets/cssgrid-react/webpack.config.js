var path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, '../../../build/public/cssgrid-react');
var APP_DIR = path.resolve(__dirname, '');


var config = {
    entry: APP_DIR + '/index.js',
    output: {
        filename: 'js/bundle.js',
        path: BUILD_DIR,
        publicPath: 'https://a3b1075e.ngrok.io/cssgrid-react/'
    },
    module : {
        loaders : [
            {
                test    : /\.jsx?/,
                include : APP_DIR,
                loader  : 'babel-loader'
            },
            {
                test    : /\.css?/,
                loader  : 'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/widgets/cssgrid-react/index.html' }),
         new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};

module.exports = config;