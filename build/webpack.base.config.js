/**
 * @author Jay
 * @date 2019-4-1
 * @description  webpack base config
 */

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ENV = process.env.NODE_ENV || "development";
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

module.exports = {
  mode: ENV, // "production" | "development" | "none"
  entry: {
    index: "./src/index.js"
  },
  output: {
    filename: "js/[name].[hash:6].js",
    chunkFilename: "js/[name].[hash:6].js",
    path: path.resolve(__dirname, "../dist")
    // publicPath: ""//string
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "@svgr/webpack",
            options: {
              babel: false,
              icon: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/"),
      "@config": path.resolve(__dirname, "../config/"),
      "@utils": path.resolve(__dirname, "../src/utils/"),
      "@context": path.resolve(__dirname, "../src/context/"),
      Styles: path.resolve(__dirname, "../src/style/"),
      Utils: path.resolve(__dirname, "../src/utils/"),
      Components: path.resolve(__dirname, "../src/components/"),
      Context: path.resolve(__dirname, "../src/context/")
    },
    extensions: [".js", ".jsx", ".less"]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin({
      // cleanOnceBeforeBuildPatterns: ["**/*", "!dll/**"]
    }),
    // new CopyPlugin([{ from: "static/", to: "static/" }]),
    new CopyPlugin([{ from: "src/json/", to: "json/" }]),
    new webpack.DllReferencePlugin({
      manifest: require("../dll/react.manifest.json")
      // context: __dirname
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      favicon: "./src/static/images/favicon.ico",
      title: "Admin",
      inject: true,
      minify: ENV === "production" && {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
      }
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, "../dll/*.dll.js"),
      outputPath: "dll",
      publicPath: "dll",
      hash: true,
      includeSourcemap: false
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      BUILD_ENV: JSON.stringify(process.env.BUILD_ENV)
    })
  ]
};
