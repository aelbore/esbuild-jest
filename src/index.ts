import { Format, Loader, TransformOptions, transformSync } from 'esbuild'
import path, { extname } from 'path'

import { babelTransform } from './transformer'

const getExt = (str: string) => {
  const basename = path.basename(str);
  const firstDot = basename.indexOf('.');
  const lastDot = basename.lastIndexOf('.');
  const extname = path.extname(basename).replace(/(\.[a-z0-9]+).*/i, '$1');

  if (firstDot === lastDot) return extname

  return basename.slice(firstDot, lastDot) + extname
}

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

export const createTransformer = (options?: Options) => ({
  process(content: string, filename: string, config: any, opts?: any) {
    const enableSourcemaps = options?.sourcemap || false
  
    const ext = getExt(filename)
    const loader = options?.loaders && options?.loaders[ext] 
      ? options.loaders[ext]  
      : extname(filename).slice(1) as Loader
  
    const sourcemaps: Partial<TransformOptions> = enableSourcemaps ? { sourcemap: true, sourcesContent: false, sourcefile: filename } : {}
  
    const source = babelTransform({
      sourceText: content,
      sourcePath: filename,
      config,
      options: opts
    })

    const result = transformSync(source, {
      loader,
      format: options?.format as Format || 'cjs',
      target: options?.target || 'es2018',
      ...(options?.jsxFactory ? { jsxFactory: options.jsxFactory }: {}),
      ...(options?.jsxFragment ? { jsxFragment: options.jsxFragment }: {}),
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