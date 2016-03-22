module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    }
};
