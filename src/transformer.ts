import babelJest from 'babel-jest'

export const { process: babelTransform } = babelJest.createTransformer({
  plugins: [ "@babel/plugin-transform-modules-commonjs" ],
  parserOpts: { 
    plugins: ["jsx", "typescript"],
  }
});
