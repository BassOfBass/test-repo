const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

/**
 * @type import("webpack").Configuration
 */
const config = {
  mode: "development",
  devtool: "inline-source-map",
  // @ts-expect-error
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    host: 'localhost',
    port: 3000,
    hot: true,
    allowedHosts: []
  },
  entry: {
    index: "./src/scripts/index.js"
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: "./src/templates/index.pug",
      chunks: ['index'],
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          { 
            loader: 'simple-pug-loader',
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: "assets/images/[name][[hash]][ext][query]"
        }
      },
    ]
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "src/assets")
    }
  },
  output: {
    filename: "scripts/[name][[contenthash]].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: '/',
    assetModuleFilename: "assets/[name]-[[hash]][ext][query]"
  }
}

module.exports = config;