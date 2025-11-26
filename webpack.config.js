const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  context: __dirname,
  devtool: 'cheap-module-source-map',
  entry: {
    index: "./src/index",
    background: "./src/background"
  },
  output: {
    path: "./dist/js",
    filename: "[name].js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    modulesDirectories: ["node_modules"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel",
        exclude: [__dirname + "/node_modules"],
        query: {
          presets: ["es2015", "react"],
          cacheDirectory: true
        }
      }
    ]
  },
  externals: {
    'chrome': 'chrome'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    })
  ]
};
