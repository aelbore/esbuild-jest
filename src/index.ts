import type { SyncTransformer, TransformerCreator } from '@jest/transform'
import type { TransformOptions } from 'esbuild'
import { transformSync } from 'esbuild'

import { Options } from './options'
import { parseLoader } from './utils'

const createTransformer: TransformerCreator<SyncTransformer<Options>, Options> = transformerConfig => ({
  canInstrument: true,
  process(sourceText, sourcePath, options) {
    let sourceCode = sourceText

    /// this logic or code from 
    /// https://github.com/threepointone/esjest-transform/blob/main/src/index.js
    /// this will support the jest.mock
    /// https://github.com/aelbore/esbuild-jest/issues/12
    /// TODO: transform the jest.mock to a function using babel traverse/parse then hoist it
    if (sourceCode.indexOf("ock(") >= 0 || options?.instrument) {
      const { code } = require('./transformer').babelTransform(sourceText, sourcePath, options)
      sourceCode = code
    }

    const buildConfig: TransformOptions = {
      loader: parseLoader(sourcePath, transformerConfig.loaders),
      format: transformerConfig?.format || 'cjs',
      target: transformerConfig?.target || 'es2018',
    }

    const isSourcemaps = !!transformerConfig?.sourcemap;
    if (isSourcemaps) {
      buildConfig.sourcemap = true
      buildConfig.sourcesContent = false
      buildConfig.sourcefile = sourcePath
    }

    if (transformerConfig?.jsxFactory) buildConfig.jsxFactory = transformerConfig.jsxFactory
    if (transformerConfig?.jsxFragment) buildConfig.jsxFragment = transformerConfig.jsxFragment
    
    const result = transformSync(sourceCode, buildConfig)

    let { map, code } = result;
    if (isSourcemaps) {
      map = {
        ...JSON.parse(result.map),
        sourcesContent: null,
      }
  
      // Append the inline sourcemap manually to ensure the "sourcesContent"
      // is null. Otherwise, breakpoints won't pause within the actual source.
      code = code + '\n//# sourceMappingURL=data:application/json;base64,' + Buffer.from(JSON.stringify(map)).toString('base64')
    } else {
      map = null
    }
  
    return { code, map }
  }
});

export * from './options'

export default {
  createTransformer
}
