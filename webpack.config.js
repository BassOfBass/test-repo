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
    host: '0.0.0.0',
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
        test: /\.pug$/i,
        use: [
          { 
            loader: 'simple-pug-loader',
            options: {
              root: path.resolve(__dirname, "src")
            }
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