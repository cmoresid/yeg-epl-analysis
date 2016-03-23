module.exports = {
    entry: "./js/index.js",
    output: {
        path: __dirname,
        filename: "./public/js/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    }
};
