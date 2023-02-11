import { Loader, CommonOptions } from 'esbuild'

export interface Options {
  jsx?: CommonOptions['jsx']
  jsxFactory?: string
  jsxFragment?: string
  sourcemap?: boolean | 'inline' | 'external'
  loaders?: {
    [ext: string]: Loader
  },
  target?: CommonOptions['target']
  format?: CommonOptions['format']
}