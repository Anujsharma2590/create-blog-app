// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const replaceEnv = require('./replaceEnv');

// const cssRegex = /\.css$/;
// const cssModuleRegex = /\.module\.css$/;
// const tsTsxJsJsxRegex = /\.(ts|tsx|js|jsx)$/;
// const sassRegex = /\.(scss|sass)$/;
// const sassModuleRegex = /\.module\.(scss|sass)$/;
// const assetsRegx =
//   /\.(png|jp(e*)g|svg|woff(2)?|ttf|eot|pdf)(\?v=\d+\.\d+\.\d+)?$/;

// module.exports = (mode) => {
//   const isEnvDevelopment = mode === 'development';

//   return {
//     entry: path.resolve(__dirname, '../src/index.tsx'),

//     module: {
//       rules: [
//         {
//           test: tsTsxJsJsxRegex,
//           exclude: /node_modules/,
//           loader: 'ts-loader',
//           options: {
//             transpileOnly: true
//           }
//         },
//         {
//           test: cssRegex,
//           exclude: cssModuleRegex,
//           use: [
//             {
//               loader: 'style-loader'
//             },
//             { loader: 'css-loader', options: { sourceMap: isEnvDevelopment } }
//           ]
//         },
//         {
//           test: cssModuleRegex,
//           use: [
//             {
//               loader: 'style-loader'
//             },
//             {
//               loader: 'css-loader',
//               options: {
//                 modules: {
//                   localIdentName: '[name]__[local]--[hash:base64:5]',
//                   exportLocalsConvention: 'dashesOnly'
//                 },
//                 sourceMap: isEnvDevelopment
//               }
//             }
//           ]
//         },
//         {
//           test: sassRegex,
//           exclude: sassModuleRegex,
//           use: [
//             {
//               loader: 'style-loader'
//             },
//             { loader: 'css-loader', options: { sourceMap: isEnvDevelopment } },
//             {
//               loader: 'sass-loader',
//               options: { sourceMap: isEnvDevelopment }
//             }
//           ]
//         },
//         {
//           test: sassModuleRegex,
//           use: [
//             {
//               loader: 'style-loader'
//             },
//             {
//               loader: 'css-loader',
//               options: {
//                 modules: {
//                   localIdentName: '[name]__[local]--[hash:base64:5]',
//                   exportLocalsConvention: 'dashesOnly'
//                 },
//                 sourceMap: isEnvDevelopment
//               }
//             },
//             {
//               loader: 'sass-loader',
//               options: { sourceMap: isEnvDevelopment }
//             }
//           ]
//         },
//         {
//           test: assetsRegx,
//           use: [
//             {
//               loader: 'url-loader',
//               options: {
//                 limit: 8192
//               }
//             }
//           ]
//         }
//       ]
//     },

//     resolve: {
//       extensions: [
//         '.ts',
//         '.tsx',
//         '.js',
//         '.json',
//         '.css',
//         '.scss',
//         '.sass',
//         '.less'
//       ]
//     },

//     plugins: [
//       new HtmlWebpackPlugin({
//         title: 'QapMatch-Marketplace',
//         template: path.resolve(__dirname, '../public/index.html'),
//         favicon: path.resolve(__dirname, '../public/favicon.ico'),
//         hash: true
//       }),
//       new CopyWebpackPlugin({
//         patterns: [
//           {
//             from: './public/build-env.json',
//             to: './build-env.json',
//             transform: replaceEnv
//           }
//         ]
//       }),
//       new ForkTsCheckerWebpackPlugin()
//     ]
//   };
// };

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

module.exports = (mode) => {
  return {
    entry: path.resolve(__dirname, "../src/index.tsx"),

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
        template: path.resolve(__dirname, "../public/index.html"),
      }),
      new webpack.ProvidePlugin({
        "window.Quill": "quill",
      }),
    ],
  };
};
