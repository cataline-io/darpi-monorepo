const path = require('path')
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin')
const port = 8181

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.ts'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src/')
    }
  },
  devServer: {
    port: port,
    static: {
      directory: path.join(__dirname, './dev')
    }
  },
  stats: 'errors-only',
  infrastructureLogging: {
    level: 'error'
  },
  plugins: [
    new CleanTerminalPlugin({
      message: `🚀 dev server running on http://localhost:${port} `
    })
  ],
  output: {
    path: path.resolve(__dirname, './dev'),
    filename: 'mask.bundle.js',
    libraryTarget: 'umd',
    library: 'mask',
    umdNamedDefine: true,
    libraryExport: 'default'
  }
}
