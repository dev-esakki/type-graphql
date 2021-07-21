const path = require('path');
const nodeExternals = require('webpack-node-externals');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const { NODE_ENV } = process.env;

module.exports = {
  entry: './src/index.ts',
  mode: "development",
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.jsx', '.tsx'],
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/, 
        use: [
          'ts-loader',
        ]
      },
    ]
  },
  externals: [ nodeExternals() ],
  watch: NODE_ENV === 'development',
  plugins: [
    new FilterWarningsPlugin({
      exclude: [/mongodb/, /mssql/, /mysql2/, /oracledb/, /pg/, /pg-native/, /pg-query-stream/, /react-native-sqlite-storage/, /redis/, /sqlite3/, /sql.js/, /typeorm-aurora-data-api-driver/]
  })
  ]
}