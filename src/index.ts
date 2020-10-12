import { transformSync } from 'esbuild'
import { extname, resolve } from 'path'
import { readFileSync, existsSync } from 'fs'

const getOptions = (): import('esbuild').TransformOptions => {
  const tsconfigPath = resolve('tsconfig.json')
  const tsconfig = existsSync(tsconfigPath) 
    ? JSON.parse(readFileSync(resolve('tsconfig.json'), 'utf-8'))
    : { compilerOptions: { target: 'es2018' } }

   return {
     format: 'cjs',
     target: tsconfig.compilerOptions?.target || 'es2018',
     sourcemap: true
   }
}

export function process(content: string, filename: string) {
  const options = getOptions()
  
  const result = transformSync(content, {
    loader: extname(filename).slice(1) as any,
    sourcefile: filename,
    ...options
  })

  return {
    code: result.js,
    map: {
      ...JSON.parse(result.jsSourceMap),
      sourcesContent: null,
    }
  }
}
