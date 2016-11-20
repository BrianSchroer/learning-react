import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';

const options = {
    template: 'src/index.html',
    minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLS: true
    },
    inject: true,
    // Available in HTML via htmlWebpackPlugin.options.trackJSToken:
    trackJSToken: 'e770eeaf2191426290b7053b9df95994'
};

export default {
    debug: true,
    devtool: 'source-map',
    noInfo: false,
    entry: {
        vendor: path.resolve(__dirname, 'src/vendor'),
        main: path.resolve(__dirname, 'src/index')
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js' // (name from entry key-value pairs above)
    },
    plugins: [
        // Generate an external css file with a hash in the file name:
        new ExtractTextPlugin('[name].[contenthash].css'),

        // Hash the files using MD5 so their names change when the content changes:
        new WebpackMd5Hash(),

        // Create a separate bundle of vendor libraries so
        // they're cached separately:
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),

        // Create HTML file that includes reference to bundled JS:
        new HtmlWebpackPlugin(options),

        // Eliminate duplicate packages when generating bundle:
        new webpack.optimize.DedupePlugin(),

        // minify JavaScript:
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
            {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
        ]
    }
}
