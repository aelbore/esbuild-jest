import { transformSync } from 'esbuild'
import { extname } from 'path'

export function process(content: string, filename: string) {
  const result = transformSync(content, {
    loader: extname(filename).slice(1) as any,
    sourcefile: filename,
    sourcemap: true,
    format: 'cjs',
    target: 'es2018'
  })

  return {
    code: result.code,
    map: {
      ...JSON.parse(result.map),
      sourcesContent: null,
    }
  }
}
