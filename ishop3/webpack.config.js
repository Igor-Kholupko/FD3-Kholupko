const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = { 
    entry: "./src/App.jsx",
    output: { 
        path: __dirname,
        filename: "bundle.js",
    },
    devtool: 'source-map',
    module: { 
        rules: [
            { 
                test: /\.jsx?$/, // какие файлы обрабатывать
                exclude: /node_modules/, // какие файлы пропускать
                use: { loader: "babel-loader" },
            },
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
            }            
        ] 
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css",
        }),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    }
}
