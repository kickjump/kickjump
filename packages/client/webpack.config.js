const path = require('path');
const loaders = require('./webpack/loaders');
const plugins = require('./webpack/plugins');

const applicationEntries = process.env.NODE_ENV === 'development'
  ? ['webpack-hot-middleware/client?reload=true']
  : [];

module.exports = {
  entry: ['./src/index.ts'].concat(applicationEntries),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js',
  },

  devtool: process.env.NODE_ENV === 'production' ?
    'source-map' :
    'inline-source-map',

  resolve: {
    extensions: [
      '',
      '.webpack.js',
      '.web.js',
      '.tsx',
      '.ts',
      '.js',
      '.json',
    ],
  },

  plugins,

  devServer: {
    historyApiFallback: { index: '/' },
  },

  module: {
    loaders: [
      loaders.tsx,
      loaders.json,
    ],
  },
};
