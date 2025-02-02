var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {
    return {
        entry: {
            index: './src/index.js',
            login: './src/login.js'
        },
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist',
            port: 8055,
            hot: true,
            open: true
        },

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[name].[hash:8].js'
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: path.resolve(__dirname, './node_modules/'),
                include: path.resolve(__dirname, './src/'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }]
            }, {
                test: /\.json$/,
                use: 'json-loader'
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }, {
                test: /\.html$/,
                use: ['html-loader']
            }, {
                test: /\.(png|jpg|gif|svg)(\?\S*)?$/i,
                use: {
                    loader: 'file-loader',
                    query: {
                        name: 'images/[name].[ext]'
                    }
                }
            }]
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: 'js/[name].[hash:8].js'
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: false,
                }
            }),
            new ExtractTextPlugin({
                filename: 'styles.[hash:8].css',
                allChunks: false,
            }),
            new htmlWebpackPlugin({
                template: 'index.html',
                filename: 'index.html',
                inject: true,
                chunks: ['index', 'vendor']
            }),
            new htmlWebpackPlugin({
                template: 'login.html',
                filename: 'login.html',
                inject: true,
                chunks: ['login', 'vendor']
            }),
            new webpack.HotModuleReplacementPlugin()
        ]
    }
};