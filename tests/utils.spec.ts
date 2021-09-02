import { getEsbuildConfig } from '../src/utils';

describe('getEsbuildConfig', () => {
  test('with sourcemaps returns correct config', () => {
    const config = getEsbuildConfig({ sourcemap: true }, 'filename.js')

    expect(config).toEqual({
      format: 'cjs',
      loader: 'js',
      target: 'es2018',
      sourcefile: 'filename.js',
      sourcemap: true,
      sourcesContent: false,
    })
  })

  describe('with loaders', () => {
    test('.js loader returns correct config', () => {
      const config = getEsbuildConfig(
        { loaders: { '.js': 'jsx' } },
        'filename.js'
      )

      expect(config).toEqual({
        format: 'cjs',
        loader: 'jsx',
        target: 'es2018',
      });
    });

    test('.js loader returns correct config with compound extension', () => {
      const config = getEsbuildConfig(
        { loaders: { '.js': 'jsx' } },
        'filename.test.js'
      )

      expect(config).toEqual({
        format: 'cjs',
        loader: 'jsx',
        target: 'es2018',
      });
    });
  })
})