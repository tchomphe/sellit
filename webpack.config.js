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
        query: {
          cacheDirectory: 'babel_cache',
          presets: ['react', 'es2015']
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
  ]  
}

module.exports = config;