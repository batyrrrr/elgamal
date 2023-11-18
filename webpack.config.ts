const path = require('path')

import type { BuildEnv } from './types/config'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as webpack from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';

export default (env: BuildEnv): webpack.Configuration => {

  const mode = env.mode || 'development';
  const PORT = env.port || 4000;
  const apiUrl = env?.apiUrl || 'http://localhost:8080';
  const isDev = mode === 'development'

  return {
    mode,
    entry: './src/index.tsx',
    module: {
      rules: [
        { test: /\.svg$/, use: 'svg-inline-loader' },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        {
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env'],
              plugins: [

                // [
                //   'i18next-extract',
                //   {
                //     locales: ['ru', 'en'],
                //     keyAsDefaultValue: true,
                //   },
                // ],
                [

                  '@babel/plugin-transform-typescript',
                  {
                    isTsx: false,
                  },
                ]

                // isDev && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        },
        {
          test: /\.(jsx|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env'],
              plugins: [
                // [
                //   'i18next-extract',
                //   {
                //     locales: ['ru', 'en'],
                //     keyAsDefaultValue: true,
                //   },
                // ],
                [
                  '@babel/plugin-transform-typescript',
                  {
                    isTsx: true,
                  },
                ],
                // isDev && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        },


      ]
    },

    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      clean: true
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html')
      }),
      new webpack.DefinePlugin({
        // __IS_DEV__: JSON.stringify(isDev),
        __API__: JSON.stringify(apiUrl)
      }),
    ],



    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      // для работы с абсолют импортом
      preferAbsolute: true,
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],

      // самый родительский файл в папке src
      mainFiles: ['index'],

      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    devServer: isDev ? {
      port: PORT,
      open: true,
      historyApiFallback: true,
      hot: true
    } : undefined,
  }
}
