const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const outputPath = path.join(__dirname, '/build');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = function (env, argv) {
  const isDevelopment = argv.mode === 'development';
  return {
    entry: [
      './src/index.tsx'
    ],
    output: {
      path: outputPath,
      filename: 'static/js/[name].[hash:8].bundle.js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx'],
    },
    devServer: {
      contentBase: path.join(__dirname, 'build'),
      compress: true,
      port: 9000,
      stats: 'errors-only',
      historyApiFallback: true
    },
    devtool: "source-map",
    stats: "errors-only",
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDevelopment ?
              'style-loader' :
              {
                loader: MiniCssExtractPlugin.loader,
              },
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
              },
            },
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[hash:8].[ext]',
                outputPath: 'static/media',
                esModule: false
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'static/fonts',
              esModule: false
            },
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: "./public/favicon.ico",
      }),
      new PreloadWebpackPlugin(
        {
          fileBlacklist: [/\.(png|jpe?g|gif|svg|js|ico|css|map|txt)$/],
          rel: 'preload',
          include: 'allAssets',
          as(entry) {
            if (/\.css$/.test(entry)) return 'style';
            if (/\.woff|woff2$/.test(entry)) return 'font';
            return 'script';
          }
        }
      ),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[hash:8].css',
      }),
      new ImageMinimizerPlugin({
        minimizerOptions: {
          severityError: 'warning',
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
            [
              'svgo',
              {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                ],
              },
            ],
          ],
        },
      }),
      new CopyPlugin({
        patterns: [
          { from: path.join(__dirname, 'public', 'robots.txt'), to: path.join(__dirname, 'build') }
        ],
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
          mode: "write-references",
          configFile: path.join(__dirname, 'tsconfig.json')
        },
        async: isDevelopment
      }),
    ],
    performance: { hints: false }
  }
};
