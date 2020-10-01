import { buildSync } from 'esbuild'

export function process(_content: string, filename: string) {
  const { outputFiles } = buildSync({
    entryPoints: [ filename ],
    write: false,
    outdir: '/',
    format: 'cjs',
    target: 'es2018',
    sourcemap: 'external'
  })

  return outputFiles.reduce((cur, item) => {
    const key = item.path.includes('.map') ? 'map': 'code'
    cur[key] = Buffer.from(item.contents).toString()
    if (key.includes('map')) {
      cur[key] = JSON.parse(cur[key])
      cur[key].sources.splice(0, 1, filename)
      cur[key].sourcesContent = null
    }
    return cur
  }, {})
}