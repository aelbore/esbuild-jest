import forceSync from 'sync-rpc'
import { join, resolve } from 'path'

const transform = forceSync(join(__dirname, 'esbuild'))

export default {
  process (content: string, filename: string) { 
    const filePath = filename.replace(resolve(), '.')
    return transform(filePath)
  }  
}