const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    // new InjectManifest({
    //   // mengarahkan ke berkas service worker yang dituju.
    //   swSrc: path.resolve(__dirname, 'src/scripts/sw.js'),
    //   swDest: './sw.js',
    // }),
    new GenerateSW({
      // mendefinisikan lokasi sekaligus nama dari berkas service worker yang akan dihasilkan. Diberikan nama "service-worker.js" secara default jika tidak didefinisikan.
      swDest: './sw.bundle.js',
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.href.startsWith('https://api.themoviedb.org/3/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'themoviedb-api',
          },
        },
        {
          urlPattern: ({ url }) => url.href.startsWith('https://image.tmdb.org/t/p/w500/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'themoviedb-image-api',
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
  ],
};
