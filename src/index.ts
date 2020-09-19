import { buildSync, OutputFile } from 'esbuild'

export function process(_content: string, filename: string) {
  const { outputFiles } = buildSync({
    entryPoints: [filename],
    write: false,
    outdir: '/',
    format: 'cjs',
    target: 'es2018',
    sourcemap: 'external',
  })

  const code = decodeFile(outputFiles[1])
  const map = JSON.parse(decodeFile(outputFiles[0]))
  // Fix source mapping by using the absolute path.
  map.sources[0] = filename
  // Save disk space by not caching the content. (Jest doesn't use it anyway.)
  map.sourcesContent = null

  return { code, map }
}

function decodeFile(file: OutputFile) {
  return Buffer.from(file.contents).toString()
}
