const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function localExternals(context, request, callback) {
  if (/\.\//.test(request)) {
    return callback(null, `commonjs ${request}`);
  }
  return callback();
}

const entitesConfig = {
  target: 'node',
  mode: 'development',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: () => {
    const files = fs.readdirSync(path.resolve(__dirname, 'src/entity'));
    const entries = {};
    files.forEach(file => {
      entries[file.split('.')[0]] = path.resolve(__dirname, 'src/entity', file);
    });
    return entries;
  },
  output: {
    path: path.resolve(__dirname, 'build/entity'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: [nodeExternals(), localExternals],
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};

const subscriberConfig = {
  target: 'node',
  mode: 'development',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: () => {
    const files = fs.readdirSync(path.resolve(__dirname, 'src/subscriber'));
    const entries = {};
    files.forEach(file => {
      entries[file.split('.')[0]] = path.resolve(__dirname, 'src/subscriber', file);
    });
    return entries;
  },
  output: {
    path: path.resolve(__dirname, 'build/subscriber'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: [nodeExternals(), localExternals],
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};


const schemaConfig = {
  target: 'node',
  mode: 'development',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: path.resolve(__dirname, 'src/schema.ts'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'schema.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: [nodeExternals(), localExternals],
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};

const mainConfig = {
  target: 'node',
  mode: 'development',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: [nodeExternals(), localExternals],
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};

module.exports = [entitesConfig, schemaConfig, subscriberConfig, mainConfig];