# esbuild-jest

[![npm](https://img.shields.io/npm/v/esbuild-jest.svg)](https://www.npmjs.com/package/esbuild-jest)

## Install

```bash
npm install --save-dev 
```

## Setup

You have to define `swc-jest` as a transformer for your JavaScript code, map _.js_ files to the `swc-jest` module.

```json
"transform": {
  "^.+\\.jsx?$": "swc-jest"
},
```