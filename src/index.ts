import { transformSync } from 'esbuild'
import { extname } from 'path'

const getOptions = (filename: string, config: any) => {
  let options = {}

  for (let i = 0; i < config.transform.length; i++) {
    if (new RegExp(config.transform[i][0]).test(filename)) {
      options = config.transform[i][2]
    }
  }

  return options
}

export function process(content: string, filename: string, config: any) {
  const options = getOptions(filename, config)

  const result = transformSync(content, {
    loader: extname(filename).slice(1) as any,
    sourcefile: filename,
    sourcemap: true,
    format: 'cjs',
    target: 'es2018',
    ...options
  })

  return {
    code: result.code,
    map: result?.map ? {
      ...JSON.parse(result.map),
      sourcesContent: null,
    }: ''
  }
}
