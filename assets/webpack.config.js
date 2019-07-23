const path = require('path');

module.exports = {
  entry: './js/app-v2.js',
  output: {
    filename: 'app-v2.js',
    path: path.resolve(__dirname, '../public/js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    alias: {
      "react": "preact/compat",
      "react-dom": "preact/compat"
    }
  }
};
