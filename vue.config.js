const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.DefinePlugin({
        global: {},
        process: {browser: true, env: {}}
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
    resolve: {
      fallback: {
        os: false,
        fs: false, // snarkjs 使用了fs库，但在浏览器环境中我们不需要它
        path: false,
        crypto: false,
        stream: false,
        zlib: false,
        util: require.resolve("util/"),
        assert: false,
        constants: false,
      },
    },
  }

})
