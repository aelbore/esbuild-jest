import * as path from 'path'
import { buildSync } from 'esbuild'
import { builtinModules } from 'module'

const pkg = require(path.resolve('package.json'))
const external = [ 
  ...builtinModules, 
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.devDependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {})
]

const build = (filename: string) => {
  const { outputFiles } = buildSync({   
    entryPoints: [ filename ],
    outdir: './dist',
    minify: false,
    bundle: true, 
    write: false,
    target: 'esnext',
    sourcemap: true,
    external
  })

  return outputFiles.reduce((cur, item) => {
    const key = item.path.includes('.map') ? 'map': 'code'
    cur[key] = Buffer.from(item.contents).toString()
    return cur
  }, {})
}

export default {
  process (content: string, filename: string) { 
    return build(filename)
  }  
}