const hq = require('alias-hq')

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "\\.[jt]sx?$":  [ 'esbuild-jest', { 
        loaders: {
          '.spec.js': 'jsx',
          '.js': 'jsx'
        },
        jsx: 'automatic'
      }
    ]
  },
  /// This will resolve any tsconfig.compilerOptions.paths
  moduleNameMapper: hq.get('jest'),
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/types/' ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}