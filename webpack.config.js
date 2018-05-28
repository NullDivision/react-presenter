module.exports = {
  devtool: 'eval-source-map',
  mode: 'development',
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.js$/, use: ['babel-loader', 'eslint-loader'] }
    ]
  }
};
