var path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'app'),
    entry: './app',
    output: {
        path: __dirname + '/dist',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.woff|.eot|.ttf|.svg/,
                loader: 'url-loader?limit=100000'
            }
        ]
    }
};
