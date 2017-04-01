var webpack = require("webpack");
var path = require("path");

var HOME = path.resolve(__dirname);
var OUTPUT = path.resolve(__dirname, "static/js")

var config = {
  entry: HOME + "/app-client.js",
  output: {
    path: OUTPUT,
    filename: "bundle.js"
  },
  module: {
    loaders: [{
        include: HOME,
        loader: "babel-loader",
    }]
  }
}

module.exports = config;