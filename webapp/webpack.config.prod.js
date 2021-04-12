var path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const webpack = require("webpack");
//
const APP_DIR = path.join(__dirname, "./src");
const BUILD_DIR = path.resolve(__dirname, "./dist");
const VENDOR_LIBS = ["react", "react-dom"];

module.exports = [
  {
    //entry: APP_DIR + "/index.js",
    entry: {
      path: APP_DIR + "/index.js",
      vendor: VENDOR_LIBS,
    },
    mode: "production",
    output: {
      path: BUILD_DIR,
      filename: "[name].[chunkhash].js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: APP_DIR,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.scss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.html$/i,
          use: [
            {
              loader: "html-loader",
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          type: "asset",
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            {
              loader: ImageMinimizerPlugin.loader,
              options: {
                severityError: "warning", // Ignore errors on corrupted images
                minimizerOptions: {
                  plugins: ["gifsicle"],
                },
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".scss", ".json"],
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: "./public/index.html",
        filename: "./index.html",
      }),
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(true),
        //VERSION: JSON.stringify('5fa3b9'),
        BROWSER_SUPPORTS_HTML5: true,
        TWO: "1+1",
        "typeof window": JSON.stringify("object"),
        //"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        "process.env": {
          // This has effect on the react lib size
          NODE_ENV: JSON.stringify("production"),
        },
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
  },
];
