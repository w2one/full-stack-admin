/* eslint-disable no-unused-vars */
/**
 * @author Jay
 * @date 2019-4-1
 * @description webpack prod config
 */

const webpack = require("webpack");
// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
// .BundleAnalyzerPlugin;
const CloudStorageWebpackPlugin = require("cloud-storage-webpack-plugin");
// const ZipPlugin = require("zip-webpack-plugin");
const common = require("./webpack.base.config.js");
const theme = require("../theme.json");

module.exports = merge(common, {
  //https://webpack.js.org/configuration/stats/#stats
  stats: {
    warnings: false
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.less|css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: "../"
            }
          },
          // {
          //   loader: "style-loader" // creates style nodes from JS strings
          // },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                // require("autoprefixer")({
                //   browsers: [
                //     ">1%",
                //     "last 4 versions",
                //     "Firefox ESR",
                //     "not ie < 9" // React doesn't support IE8 anyway
                //   ],
                //   flexbox: "no-2009"
                // }),
                require("postcss-preset-env")({
                  // browsers: [
                  //   ">1%",
                  //   "last 4 versions",
                  //   "Firefox ESR",
                  //   "not ie < 9" // React doesn't support IE8 anyway
                  // ],
                  flexbox: "no-2009"
                }),
                require("cssnano")({
                  preset: "default"
                })
              ]
            }
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
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "image/[name].[hash:6].[ext]"
              // outputPath: "image/",
              // publicPath: ".."
            }
          }
        ]
      },
      {
        test: /\.(ttf|woff)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "font/[name].[ext]",
              publicPath: ".."
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   filename: "index.html",
    //   template: "./src/index.html",
    //   inject: true
    //   // minify: {
    //   //   removeComments: true,
    //   //   collapseWhitespace: true,
    //   //   removeAttributeQuotes: true,
    //   //   removeEmptyAttributes: true,
    //   //   minifyJS: true
    //   // }
    // }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].[hash:6].css",
      chunkFilename: "css/[name].[hash:6].css"
    }),
    // 分析bundle
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 8889
    // }),
    // cloud storage
    // new CloudStorageWebpackPlugin(require("../config/cloudStorage.json")),
    new webpack.BannerPlugin("Build in " + new Date())
    // new ZipPlugin({
    //   // path: "../",
    //   // pathPrefix: "www",
    //   filename: "dist.zip"
    // })
  ],
  optimization: {
    runtimeChunk: {
      name: "runtime"
    },
    minimizer: [
      // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
      new TerserPlugin({
        terserOptions: {
          parallel: true,
          cache: true,
          compress: { warnings: false, drop_console: true, unused: true },
          output: {
            // comments: false
            comments: /Build in/i
          }
        },
        extractComments: false
      })
    ],
    splitChunks: {
      chunks: "all", //all, async, and initial
      minChunks: 3,
      name: false,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        },
        // packaged css in one file
        styles: {
          name: "styles",
          test: /\.(less|css)$/,
          chunks: "all",
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
    // mobile: {
    //   test: /node_modules\/antd-mobile/,
    //   chunks: "initial",
    //   name: "mobile",
    //   priority: 10,
    //   enforce: true
    // }
  }
});
