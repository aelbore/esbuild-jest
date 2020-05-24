import { rollup, OutputChunk, RollupWarning, WarningHandler } from 'rollup'
import esbuild, { Options } from 'rollup-plugin-esbuild'

export default () => {
  return async (filename: string, options?: Options) => {
    const bundle = await rollup({   
      input: filename,
      plugins: [ 
        esbuild({ 
          target: 'es2019',
          jsxFactory: 'React.createElement',
          jsxFragment: 'React.Fragment',
          ...(options ?? {})
        }) 
      ],
      onwarn(warning: RollupWarning, defaultHandler: WarningHandler) {
        return
      }
    })
    const { output } = await bundle.generate({ sourcemap: true, format: 'cjs' })
    const { code, map } = output.shift() as OutputChunk

    return { code, map: (map ?? '').toString() }
  }
}