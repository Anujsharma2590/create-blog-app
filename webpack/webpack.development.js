const path = require("path");

module.exports = {
  mode: "development",

  // output: {
  //   publicPath: "/",
  //   path: path.resolve(__dirname, "../dist"),
  //   filename: "[name].bundle.js",
  // },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  // optimization: {
  //   moduleIds: "deterministic",
  //   runtimeChunk: "single",
  //   splitChunks: {
  //     name: false,
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "vendors",
  //         chunks: "all",
  //       },
  //     },
  //   },
  // },

  // cache: {
  //   type: "filesystem",
  //   maxAge: 604800000,
  //   cacheDirectory: path.resolve(__dirname, "../.temp_cache"),
  // },

  // devtool: "source-map",

  //   devServer: {
  //     historyApiFallback: true,
  //     hot: true,
  //     host: 'localhost',
  //     port: 4200,
  //     compress: true,
  //     open: {
  //       // target: 'https://qapmatch-open.qapitacorp.local',
  //       target: 'https://localhost:4200',
  //       app: {
  //         name: 'google-chrome'
  //       }
  //     },
  //     server: 'https',
  //     allowedHosts: ['qapmatch.qapitacorp.local']
  //   }
  // };

  devServer: {
    historyApiFallback: true,
    hot: true,
    compress: true,
    port: 3000,
    host: "localhost",
    compress: true,
    open: {
      target: "https://localhost:3000",
      app: {
        name: "google-chrome",
      },
    },
  },
};
