// this file requires babel-register to be installed

// in order to be transpiled
import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"
import ExtractTextPlugin from "extract-text-webpack-plugin"
import { HotModuleReplacementPlugin } from "webpack"

const PATHS = {
    src: path.resolve(__dirname, "src")
  };

export default () => ({

    entry: [
      // Needed to preserve state on rerender
      "react-hot-loader/patch",
      // WDS host and port
      "webpack-dev-server/client?http://localhost:8080",
      // entry file src/index.js
      path.join(PATHS.src,"index.js")
    ],
    output: {
        path: path.join(__dirname, "public"),
        filename: "[name].bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "template.ejs"),
        }),
        new ExtractTextPlugin("[name].css"),
        new HotModuleReplacementPlugin(),
    ],
    resolve: {
        alias: {
            src: PATHS.src,
        },
        extensions: [".js", ".jsx", ".json", ".css", ".scss",".png",".jpg", ".svg"],
    },
    module: {
        rules: [
          { test: /\.json$/, use: "json-loader" },
          { test: /\.scss$/, loader: ExtractTextPlugin.extract({ fallbackLoader: "style", loader: "css?minifier!group-css-media-queries!sass" })},
          { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/, loader: "file-loader" },
          { test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/, include: path.join(__dirname, "src"),
            options: {
              // the babelrc in root is used to traspile only this config
              babelrc: false,
              // project settings are defined here
              presets: [ ["es2015", { modules: false } ], "react" ],
              plugins: ["react-hot-loader/babel"] }},
         { test: /\.html$/, use: "file-loader" },
         { test: /\.md/, use: "markdown-loader" }
        ],
    },
    devServer: {
      hot: true,
      stats: {
          colors: true // colorful output
      }
    }
})
