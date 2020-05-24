import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import { plugins, external } from './tools/plugins'

export default [ 
  {
    input: './src/index.ts',
    external,
    plugins: [ esbuild({ target: 'es2019' }), ...plugins ],
    output: [
      {
        file: './dist/esbuild-jest.js',
        format: 'cjs'
      },
      {
        file: './dist/esbuild-jest.es.js',
        format: 'es'
      }
    ]
  },
  {
    input: './src/esbuild.ts',
    external,
    plugins: [ esbuild({ target: 'es2019' }) ],
    output: {
      file: './dist/esbuild.js',
      format: 'cjs'
    }
  },
  {
    input: './src/index.ts',
    external,
    plugins: [ dts() ],
    output: {
      format: 'es',
      file: './dist/esbuild-jest.d.ts',
    }
  }
]