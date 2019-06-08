import CopyWebpackPlugin from 'copy-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import path from 'path'
import uuid from 'uuid'
import webpack from 'webpack'

const src = path.join(__dirname, 'src')
const build = path.join(__dirname, 'build')

/** Injected via webpack.DefinePlugin and sass-loader data */
const MASKED_URL = `"nay-blocked-${uuid()}"`

const config: webpack.Configuration = {
  entry: {
    background: path.join(src, 'background', 'index.ts'),
    options: path.join(src, 'options', 'index.tsx'),
    popup: path.join(src, 'popup', 'index.tsx'),
    block: path.join(src, 'dom', 'block.ts'),
  },
  output: {
    path: build,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader', options: { attrs: { 'data-nay-stylesheet': 'yay' } } },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              data: `$MASKED_URL: ${MASKED_URL};`,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  watch: process.env.NODE_ENV === 'development',
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(src, 'options', 'index.html'),
      inject: 'body',
      filename: 'options.html',
      title: 'Options - Nay!',
      chunks: ['options'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(src, 'popup', 'index.html'),
      inject: 'body',
      filename: 'popup.html',
      title: 'Popup - Nay!',
      chunks: ['popup'],
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(src, 'assets'),
        to: path.join(build, 'assets'),
        test: /\.(jpg|jpeg|png|gif|svg)?$/,
      },
      {
        from: path.join(src, 'manifest.json'),
        to: path.join(build, 'manifest.json'),
        toType: 'file',
      },
    ]),
    new webpack.DefinePlugin({ MASKED_URL }),
  ],
}

export default config
