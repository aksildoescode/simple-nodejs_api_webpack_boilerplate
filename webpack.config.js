const nodeExternal = require("webpack-node-externals");
const path = require("path");
module.exports = {
  target: "node",
  externals: [nodeExternal()],
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};