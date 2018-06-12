/*eslint-disable*/
var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

var APP_ENV       = process.env.APP_ENV || process.env.NODE_ENV || 'development';
var IS_PROD_BUILD = !["development", "test"].includes(APP_ENV);

module.exports = {
  mode: IS_PROD_BUILD ? 'production' : 'development',
  entry: [
    IS_PROD_BUILD && 'react-hot-loader/patch',
    path.resolve('./app/app.js')
  ].filter(Boolean),
  //output: { path: __dirname, filename: '[name].[hash].js' },
  output: {
    filename: 'static/js/[name].[hash].bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].chunk.js',
  },
  node: {
    dns: 'mock',
    net: 'mock'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [__dirname, "node_modules"]
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          !IS_PROD_BUILD ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  optimization: {
    minimize: IS_PROD_BUILD
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: !IS_PROD_BUILD ? '[name].css' : '[name].[hash].css',
      chunkFilename: !IS_PROD_BUILD ? '[id].css' : '[id].[hash].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Exerciser',
      // Load a custom template (lodash by default see the FAQ for details)
      template: 'index.html'
    })
  ]
};

if (process.env.ANALYZE) {
  module.exports.plugins.push(new BundleAnalyzerPlugin());
}

if (IS_PROD_BUILD) {
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
  module.exports.devtool = 'inline-sourcemap'
}
