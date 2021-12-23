const { hasInstalledPackage } = require('./utils')

const presets = [
  '@cyansalt/stylelint-config',
  '@cyansalt/stylelint-config/syntax',
  '@cyansalt/stylelint-config/order',
  '@cyansalt/stylelint-config/aurora',
]

if (hasInstalledPackage('sass')) {
  presets.push('@cyansalt/stylelint-config/scss')
  presets.push('@cyansalt/stylelint-config/aurora/scss')
}

module.exports = {
  extends: presets,
}
