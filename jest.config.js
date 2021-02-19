module.exports = {
  transform: {
    "\\.[jt]sx?$":  'esbuild-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/types/', '/examples/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}