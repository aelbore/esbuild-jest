import { extname } from 'path'

import { Config } from '@jest/types'
import { TransformOptions as JestTransformOptions, Transformer } from '@jest/transform'
import { Format, Loader, TransformOptions, transformSync } from 'esbuild'

import { Options } from './options'
import { getExt, loaders } from './utils'

const createTransformer = (options?: Options) => ({
  process(content: string, 
    filename: string, 
    config: Config.ProjectConfig, 
    opts?: JestTransformOptions
  ) {
    const sources = { code: content }
    const ext = getExt(filename), extName = extname(filename).slice(1)

    const enableSourcemaps = options?.sourcemap || false
    const loader = (options?.loaders && options?.loaders[ext] 
      ? options.loaders[ext]
      : loaders.includes(extName) ? extName: 'text'
    ) as Loader
    const sourcemaps: Partial<TransformOptions> = enableSourcemaps 
      ? { sourcemap: true, sourcesContent: false, sourcefile: filename } 
      : {}

    /// this logic or code from 
    /// https://github.com/threepointone/esjest-transform/blob/main/src/index.js
    /// this will support the jest.mock
    /// https://github.com/aelbore/esbuild-jest/issues/12
    /// TODO: transform the jest.mock to a function using babel traverse/parse then hoist it
    if (sources.code.indexOf("ock(") >= 0 || opts?.instrument) {
      const source = require('./transformer').babelTransform({
        sourceText: content,
        sourcePath: filename,
        config,
        options: opts
      })
      sources.code = source
    }

    const result = transformSync(sources.code, {
      loader,
      format: options?.format as Format || 'cjs',
      target: options?.target || 'es2018',
      ...(options?.jsxFactory ? { jsxFactory: options.jsxFactory }: {}),
      ...(options?.jsxFragment ? { jsxFragment: options.jsxFragment }: {}),
      ...(options?.define ? { define: options.define }: {}),
      ...sourcemaps
    })
  
    let { map, code } = result;
    if (enableSourcemaps) {
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
})

const transformer: Pick<Transformer, 'canInstrument' | 'createTransformer'> = {
  canInstrument: true,
  createTransformer
}

export * from './options'

export default transformer
