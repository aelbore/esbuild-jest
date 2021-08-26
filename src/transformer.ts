import { TransformOptions } from '@jest/transform'

import babelJest from 'babel-jest'

const { process } = babelJest.createTransformer({
  plugins: [ "@babel/plugin-transform-modules-commonjs" ],
  parserOpts: { 
    plugins: ["jsx", "typescript"],
  }
})

export interface BabelTransformOptions {
  sourceText: string
  sourcePath: string
  options?: TransformOptions
}

export function babelTransform(opts: BabelTransformOptions) {
  const { sourceText, sourcePath, options } = opts
  const babelResult = process(sourceText, sourcePath, options) as { code: string }
  return babelResult.code
}