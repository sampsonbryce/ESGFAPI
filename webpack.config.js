module.exports = {
    entry: __dirname + "/src/js/container.jsx",
    devtool: 'source-map',
    output: {
        path: __dirname + "/static",
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                presets: ['es2015', 'react']
            }
        }]
    }
};
