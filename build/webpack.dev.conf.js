'use strict'
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.conf.js');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } =  require ('vue-loader' );
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  entry: {
    app: './examples/main.js',
    vendors: ['vue', 'vue-router']
  },
  output: {
    path:path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  devtool: 'source-map',
  module: {
    rules:[
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('examples'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true,
          failOnError: true,
          failOnWarning : true,
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: './dist',
    // open: true,
    hot: true,
    inline: true,
    //host: HOST || 'localhost',
    host: '0.0.0.0',
    disableHostCheck: true,
    port: '8888'
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': require('../config/dev.env')
    // }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      filename: './index.html',
      template: './examples/index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../examples/routers'),
        to: 'static',
        ignore: ['.*']
      }
    ]),
    new FriendlyErrorsPlugin(),
    new VueLoaderPlugin()
  ]
});
