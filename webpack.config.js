/*eslint-disable*/
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");

var APP_ENV       = process.env.APP_ENV || process.env.NODE_ENV || 'development';
var IS_PROD_BUILD = ! ["development", "test"].includes(APP_ENV);


module.exports = {
  entry: './app/app.js',
  output: { path: __dirname, filename: './dist/app.js' },
  node: {
    dns: 'mock',
    net: 'mock'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [__dirname, "node_modules"]
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'es2016', 'react', 'stage-3', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: ['css-loader'],
                }),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./dist/app.css')
  ]
};

if (IS_PROD_BUILD) {
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
  module.exports.plugins.push(new CompressionPlugin({
    asset: "[file].gz",
    algorithm: "gzip",
    test: /\.(js|css|html)$/
  }));
  module.exports.plugins.push(new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  }));
} else {
  var exclude = /node_modules/
  module.exports.module.loaders[0].exclude = exclude
  module.exports.devtool = 'inline-sourcemap'
}
