# esbuild-jest

### A Jest transformer using esbuild
With this transformer you can use and transform (ts, js, tsx and jsx) files

[![npm](https://img.shields.io/npm/v/esbuild-jest.svg)](https://www.npmjs.com/package/esbuild-jest)

## Install

```bash
npm install --save-dev esbuild-jest
```

#### Setting up Jest config file

esbuild-jest transformer should be used in your Jest config file like this:

```js
{
  "transform": {
    "^.+\\.tsx?$": "esbuild-jest"
  }
}
```
