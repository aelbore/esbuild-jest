import path from 'path' 
import { Format, Loader, TransformOptions } from 'esbuild'

const loaders = ['js', 'jsx', 'ts', 'tsx', 'json']

const getExt = (str: string) => {
  const basename = path.basename(str);
  const firstDot = basename.indexOf('.');
  const lastDot = basename.lastIndexOf('.');
  const extname = path.extname(basename).replace(/(\.[a-z0-9]+).*/i, '$1');

  if (firstDot === lastDot) return extname

  return basename.slice(firstDot, lastDot) + extname
}

export const getEsbuildConfig = (options, filename) => {
  const ext = getExt(filename),
    extName = path.extname(filename).slice(1)
  const loader = (options?.loaders && options?.loaders[ext]
    ? options.loaders[ext]
    : loaders.includes(extName)
    ? extName
    : 'text') as Loader

  const enableSourcemaps = options?.sourcemap || false
  const sourcemaps: Partial<TransformOptions> = enableSourcemaps
    ? { sourcemap: true, sourcesContent: false, sourcefile: filename }
    : {}

  return {
    loader,
    format: (options?.format as Format) || 'cjs',
    target: options?.target || 'es2018',
    ...(options?.jsxFactory ? { jsxFactory: options.jsxFactory } : {}),
    ...(options?.jsxFragment ? { jsxFragment: options.jsxFragment } : {}),
    ...sourcemaps,
  }
}
