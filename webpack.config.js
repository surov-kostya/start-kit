const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const path = require('path');

const config = {
  entry: './src/scripts/main.js',
  output: {
    // path: path.resolve(__dirname, 'build/scripts/'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['env']
            }
        }
    ]
  },
  stats: {
      colors: true
  },
  devtool: 'source-map'
  // ,
  // plugins: [
  //     new UglifyJSPlugin({
  //         sourceMap: true
  //     })
  // ]
};

  module.exports = config;