module.exports = {
  mode: 'production',
  entry: './asm.js',
  output: {
    path: __dirname,
    filename: 'asm.es5.js'
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env', {
                  targets: {
                    ie: 11,
                  },
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ]
            ]
          }
        }
      }
    ]
  },
};
