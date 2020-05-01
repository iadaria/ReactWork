const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_moudles/,
                loader: 'babel-loader'
            },
            //
            // Loading images
            //
            {
                test: /\.(png|jpg|gif|ico|jpeg)$/,
                use: [ //loader definition which prepare was installed npm install --save-dev file-loader
                    { 
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            name: '[name]-[sha1:hash:7].[ext]'
                        }
                    }
                ]
            },
            //
            // Loading fonts
            //
            {
                test: /\.(ttf|otf|eot|woff|woff2)$/,
                use: [ //loader definition which prepare was installed npm install --save-dev file-loader
                    { 
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },

            {
                test: /\.(css)$/,
                //use: ['style-loader', 'css-loader']
                use: [ MiniCssExtractPlugin.loader, 'css-loader']
            },

            // Loading SASS/SCSS
            {
                test: /\.(s[ca]ss)$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader/* 'style-loader' */},
                    { loader: 'css-loader'},
                    { loader: 'sass-loader'}
                ]
            },

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hellow World',
            buildTime: new Date().toISOString(),
            template: 'public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'main-[hash:8].css'
        })
    ],

    devServer: {
        open: true
    }

};