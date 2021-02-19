import { TransformOptions } from '@jest/transform'
import { Config } from '@jest/types'

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
  config: Config.ProjectConfig
  options?: TransformOptions
}

export function babelTransform(opts: BabelTransformOptions) {
  const { sourceText, sourcePath, config, options } = opts
  const babelResult = process(sourceText, sourcePath, config, options) as { code: string }
  return babelResult.code
}