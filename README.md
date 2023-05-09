# @cyansalt/stylelint-config-preset

[![npm](https://img.shields.io/npm/v/@cyansalt/stylelint-config-preset.svg)](https://www.npmjs.com/package/@cyansalt/stylelint-config-preset)

My Stylelint configuration preset.

## Installation

```shell
npm install --save-dev @cyansalt/stylelint-config-preset
```
## Usage

```javascript
// stylelint.config.js
module.exports {
  // ...
  extends: [
    '@cyansalt/stylelint-config-preset',
  ],
  // ...
}
```

The ruleset will check your project dependencies and enable available configurations automatically. This eliminates the need for you to know any specific ruleset configuration.

Also see [@cyansalt/stylelint-config](https://www.npmjs.com/package/@cyansalt/stylelint-config).
