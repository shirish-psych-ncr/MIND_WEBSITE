module.exports = {
  parser: 'postcss-safe-parser',
  plugins: [
    require('cssnano')({ preset: 'default' })
  ]
};
