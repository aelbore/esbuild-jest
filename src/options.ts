import { Loader } from 'esbuild'

export interface Options {
  jsx?: 'automatic' | 'classic'
  jsxFactory?: string
  jsxFragment?: string
  sourcemap?: boolean | 'inline' | 'external'
  loaders?: {
    [ext: string]: Loader
  },
  target?: string
  format?: string
}