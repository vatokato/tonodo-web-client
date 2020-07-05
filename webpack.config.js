const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: [
    '@babel/polyfill',
    path.resolve(__dirname, "src", "index.js"),
  ],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]',
              },
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /favicon\.ico$/,
        loader: 'file-loader',
        options: {
          limit: 1,
          name: '[name].[ext]',
        },
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html")
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: 'src',
    historyApiFallback: true,
    port: 3000,
    proxy: {
      '/api/': {
        target: 'http://134.0.119.35:5000',
        // target: 'http://localhost:5000',
        pathRewrite: { '/api/': '' },
        secure: false,
        changeOrigin: true,
      },
      '/socket.io/': {
        target: 'http://134.0.119.35:5000',
        // target: 'http://localhost:5000',
        secure: false,
        ws: true,
      },
    }
  }
};
