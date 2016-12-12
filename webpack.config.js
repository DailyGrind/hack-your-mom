const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require("webpack-merge");
const webpack = require("webpack");
const ModernizrPlugin = require('modernizr-webpack-plugin');

const PATHS = {
    src: path.resolve(__dirname, "src"),
    build: path.resolve(__dirname, "public"),
};


const modernizrConfig = {
    "filename": "modernizr.js",
    'options': [
        'setClasses',
        'html5printshiv'
    ],
    'feature-detects': [
        "inputtypes",
        "network/connection",
        "touchevents"
    ],
    "minify" : {
        "output": {
            "comments": false,
            "beautify": false,
            "screw_ie8": true
        }
    }
};

const stripLogger = 'strip-loader?strip[]=console.error' +
    '&strip[]=console.log' +
    '&strip[]=console.warn';

const common = {

    entry: {
        src: [PATHS.src],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: PATHS.build,
        publicPath: "/",
        filename: "[name].bundle.js"
    },

    resolveLoader: {
        modules: [path.join(__dirname, './node_modules')],
        moduleExtensions: ["-loader"],
    },
    resolve: {
        alias: {
            src: PATHS.src,
        },
        extensions: [".js", ".jsx", ".json", ".css", ".scss",".png",".jpg", ".svg"],
        descriptionFiles: ["package.json"],
        moduleExtensions: ["-loader"],
        modules: [PATHS.src, "node_modules"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.template.ejs',
            inject: 'body',
        }),
        new ModernizrPlugin(modernizrConfig),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js"
        }),

        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: true
        }),
        new ExtractTextPlugin('[name].css')
    ],
    module: {
        loaders: [{ test: /\.json$/, use: "json-loader" },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style',
                    loader: 'css?minifier!group-css-media-queries!sass'
                })
            },{
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
                loader: 'file-loader'
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader', stripLogger, stripLogger],
                exclude: [/node_modules/]
            },
            {
                test: /\.html$/,
                use: "file-loader"
            },
            {
                test: /\.md/,
                use: ["markdown-loader"]
            }
        ],
    },
    node: {
        vm: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },

};

let config;

switch (process.env.npm_lifecycle_event) {
    case "build":
        config = merge(common, {devtool: "source-map"});
        break;
    default:
        config = merge( common,  { devtool: "eval-source-map"});
}

module.exports = config;
