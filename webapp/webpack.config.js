var path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

//
var APP_DIR = path.join(__dirname, "./src");
var BUILD_DIR = path.resolve(__dirname, "./dist");

module.exports = [
  {
    entry: APP_DIR + "/index.js",
    mode: "development",
    output: {
      path: BUILD_DIR,
      filename: "index_bundle.js",
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
  },
];
