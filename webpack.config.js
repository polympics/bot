const path = require('path');

const mode = 'production';

module.exports = {
    devtool: false,
    entry: './worker_src/index.ts',
    output: {
        filename: 'worker.js',
        path: path.join(__dirname, 'dist'),
    },
    mode,
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        plugins: [],
    },
    module: {
        rules: [
            {
                test: require.resolve(
                    './node_modules/polympics/dist/polympics.js'
                ),
                use: 'exports-loader?type=commonjs&exports=single|polympics',
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
            },
        ],
    },
};
