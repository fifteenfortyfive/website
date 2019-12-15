const path = require('path');

module.exports = {
  entry: './js/app-v2.js',
  output: {
    filename: 'app-v2.js',
    path: path.resolve(__dirname, '../public/js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.mod.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: '../images/',
              publicPath: '/images/',
              name: file => {
                if (process.env.NODE_ENV === 'development') {
                  return '[name].[ext]';
                }

                return '[contenthash].[ext]';
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
};
