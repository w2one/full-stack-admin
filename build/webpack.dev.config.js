/**
 * @author Jay
 * @date 2019-4-1
 * @description webpack dev config
 */

const webpack = require("webpack");
const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.base.config.js");
const theme = require("../theme.json");

module.exports = merge(common, {
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      // { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.less|css$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader",
            options: {
              modifyVars: theme,
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(ttf|woff)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [new webpack.ProgressPlugin()],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    host: "0.0.0.0",
    port: 9100,
    useLocalIp: true, //open with your local IP.
    hot: true,
    hotOnly: true,
    open: true,
    disableHostCheck: true,
    historyApiFallback: true
  }
});
