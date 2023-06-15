const path = require("path");

module.exports = {
  mode: "production",

  output: {
    filename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },

  // optimization: {
  //   moduleIds: 'deterministic',
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     chunks: 'all',
  //     maxInitialRequests: Infinity,
  //     minSize: 0
  //     // name: false,
  //     // cacheGroups: {
  //     //   vendor: {
  //     //     test: /[\\/]node_modules[\\/]/,
  //     //     name: 'vendors',
  //     //     chunks: 'all'
  //     //   }
  //     // }
  //   }
  // }
};
