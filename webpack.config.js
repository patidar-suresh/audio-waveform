const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src/scss'),
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        publicPath: '/build',
        port: 8080
    },
    optimization: {
        minimize: true
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}