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
  const outFiles = buildSync({   
    entryPoints: [ filename ],
    outfile: './dist/main.js',
    minify: false,
    bundle: true, 
    write: false,
    target: 'esnext',
    sourcemap: true,
    external
  })

  return outFiles.outputFiles.reduce((cur, item) => {
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