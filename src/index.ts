import { transformSync } from 'esbuild'
import path from 'path'

export function process(content: string, filename: string) {
  const result = transformSync(content, {
    loader: path.extname(filename).slice(1) as any,
    format: 'cjs',
    target: 'es2018',
    sourcemap: true,
    sourcefile: filename,
  })
  return {
    code: result.js,
    map: {
      ...JSON.parse(result.jsSourceMap),
      sourcesContent: null,
    },
  }
}
