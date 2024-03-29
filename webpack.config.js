const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: path.join(__dirname, '/client/src/index.jsx'),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx", ".css"] },
  output: {
    path: path.join(__dirname,"/client/public"),
    publicPath: "/dist/",
    filename: "bundle.js"
  }
};