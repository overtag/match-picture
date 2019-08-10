const path = require("path");
module.exports = {
  entry: {
    app: "./src/App.js"
  },

  output: {
    filename: "../app.min.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist"
  },
  devServer: {
    overlay: true
  }
};
