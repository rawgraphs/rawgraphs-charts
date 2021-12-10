require('@babel/register')({
  plugins: ['@babel/plugin-transform-modules-commonjs'],
})
const convertCSS = require('./convertCSS').default

module.exports = function (source) {
  const convertedCSS = convertCSS(source)
  return `export default ${JSON.stringify(convertedCSS)}`
}
