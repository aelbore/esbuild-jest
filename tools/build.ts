import { TSRollupConfig, clean, bundle } from 'aria-build'
import { builtinModules } from 'module'

import plugins from '../aria.config'

(async function() {
  const pkg = require('../package.json')

  const external = [
    ...builtinModules,
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.devDependencies)
  ]

  const config: TSRollupConfig[] = [
    {
      input: './src/index.ts',
      external,
      plugins: plugins.plugins,
      output: [
        {
          file: './dist/esbuild-jest.js',
          format: 'cjs',
          exports: 'auto'
        },
        {
          file: './dist/esbuild-jest.es.js',
          format: 'es',
          exports: 'auto'
        }
      ],
      tsconfig: {
        compilerOptions: {
          declaration: true
        }
      }
    },
    {
      input: './src/transformer.ts',
      external,
      output: [
        {
          file: './dist/transformer.js',
          format: 'cjs',
          exports: 'auto'
        }
      ]
    }
  ]

  await clean('dist')
  await bundle({ config, swc: true, write: true })
})()