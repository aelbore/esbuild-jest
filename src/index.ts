import { transformSync } from 'esbuild'
import { extname, resolve } from 'path'
import { readFileSync, existsSync } from 'fs'


export function process(content: string, filename: string) {
  
  const result = transformSync(content, {
    loader: extname(filename).slice(1) as any,
    sourcefile: filename,
    format: 'cjs',
    target: 'es2018',
    sourcemap: true,
  })

  return {
    code: result.js,
    map: {
      ...JSON.parse(result.jsSourceMap),
      sourcesContent: null,
    }
  }
}
