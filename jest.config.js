module.exports = {
  transform: {
    "\\.[jt]sx?$":  [ 'esbuild-jest', { 
        loaders: {
          '.spec.js': 'jsx'
        }
      }
    ]
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/types/' ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}