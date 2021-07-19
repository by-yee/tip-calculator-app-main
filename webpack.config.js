const path = require('path');
const HWP = require('html-webpack-plugin');
module.exports = {
    entry: path.join(__dirname, './src/js/index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, './public')
    },
    module:{
        rules:[
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader'
            },
            {
              test: /\.(css)$/,
              exclude: /node_modules/,
              use: ['style-loader','css-loader']
            },
            {
              test: /\.(woff|woff2|eot|ttf|svg|jpg|png)$/,
              use: {
                loader: 'url-loader',
              }
            }
          ]
    },
    plugins:[
        new HWP(
            {template: path.join(__dirname, './src/index.html')}
        )
    ]
}