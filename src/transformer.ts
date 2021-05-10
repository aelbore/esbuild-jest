import babelJest from 'babel-jest'

import type { TransformOptions } from '@jest/transform'
import type { Config } from '@jest/types'

const { process } = babelJest.createTransformer({
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    "@babel/preset-react"
  ]
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