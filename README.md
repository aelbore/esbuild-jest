# esbuild-jest

### A Jest transformer using esbuild
With this transformer you can use and transform (ts, js, tsx and jsx) files

[![npm](https://img.shields.io/npm/v/esbuild-jest.svg)](https://www.npmjs.com/package/esbuild-jest)

## Install

```bash
npm install --save-dev esbuild-jest esbuild
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

#### Setting up Jest config file with transformOptions
```typescript
export interface Options {
  jsxFactory?: string
  jsxFragment?: string
  sourcemap?: boolean | 'inline' | 'external'
  loaders?: {
    [ext: string]: Loader
  },
  target?: string
  format?: string
}
```

```js
{
  "transform": {
    "^.+\\.tsx?$": [ 
      "esbuild-jest", 
      { 
        sourcemap: false,
        loaders: {
          '.spec.ts': 'tsx'
        }
      } 
    ]
  }
}
```



