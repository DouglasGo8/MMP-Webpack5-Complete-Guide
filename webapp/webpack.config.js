var path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

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
    mode: "development",
    output: {
      path: BUILD_DIR,
      filename: "[name].[chunkhash].js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
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
    devServer: {
      contentBase: BUILD_DIR,
      compress: true,
      port: 8080,
      disableHostCheck: false,
    },
  },
];
