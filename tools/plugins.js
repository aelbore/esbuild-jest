import * as fs from 'fs'
import { symlinkDir } from 'aria-fs'

function copy() {
  return {
    name: 'copy',
    buildEnd: async () => {
      await fs.promises.mkdir('dist', { recursive: true })
      const pkg = require('./package.json')
      delete pkg.scripts
      delete pkg.devDependencies
      await Promise.all([ 
        fs.promises.writeFile('./dist/package.json', JSON.stringify(pkg, null, 2)),
        fs.promises.copyFile('./README.md', './dist/README.md')
      ])
    }
  }
}

function link() {
  return {
    name: 'link',
    buildEnd: async () => {
      await symlinkDir('./dist', './node_modules/esbuild-jest')
    }
  }
}

export const plugins = [ copy(), link() ]
export const external = [ 'sync-rpc', 'path', 'rollup', 'rollup-plugin-esbuild' ]