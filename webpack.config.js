const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const tsTsxJsJsxRegex = /\.(ts|tsx|js|jsx)$/;
const assetsRegx =
  /\.(png|jp(e*)g|svg|woff(2)?|ttf|eot|pdf)(\?v=\d+\.\d+\.\d+)?$/;

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".json",
      ".css",
      ".scss",
      ".sass",
      ".less",
    ],
  },
  module: {
    rules: [
      {
        test: tsTsxJsJsxRegex,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: [
          {
            loader: "style-loader",
          },
          { loader: "css-loader" },
        ],
      },
      {
        test: cssModuleRegex,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
                exportLocalsConvention: "dashesOnly",
              },
            },
          },
        ],
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: [
          {
            loader: "style-loader",
          },
          { loader: "css-loader" },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: sassModuleRegex,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
                exportLocalsConvention: "dashesOnly",
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: assetsRegx,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.ProvidePlugin({
      "window.Quill": "quill",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
  },
};
