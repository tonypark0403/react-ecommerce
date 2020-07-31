const path = require('path')
const nodeExternals = require('webpack-node-externals')


module.exports = {
    entry: {
        server: './src/server.js',
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    target: 'node',
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    resolve: {
        extensions: ['.mjs'],
    },
}