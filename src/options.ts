import { Format, Loader } from 'esbuild'

export interface Options {
  jsxFactory?: string
  jsxFragment?: string
  sourcemap?: boolean | 'inline' | 'external'
  loaders?: Record<string, Loader>
  target?: string
  format?: Format
}