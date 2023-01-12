import type { Loader } from 'esbuild'
import type { Options } from './options'
import path from 'path' 

const getExt = (str: string) => {
  const basename = path.basename(str);
  const firstDot = basename.indexOf('.');
  const lastDot = basename.lastIndexOf('.');
  const extname = path.extname(basename).replace(/(\.[a-z0-9]+).*/i, '$1');

  if (firstDot === lastDot) return extname

  return basename.slice(firstDot, lastDot) + extname
}

const loaders = ["js", "jsx", "ts", "tsx", "json"]
const checkLoader = (extName: string = ''): extName is Loader => loaders.includes(extName)

export const parseLoader = (sourcePath: string, loaders: Options['loaders'] = {}): Loader => {
  const ext = getExt(sourcePath)
  const loader = loaders[ext]
  if (loader) return loader
  const extName = path.extname(sourcePath).slice(1)
  return checkLoader(extName) ? extName : 'text'
}
