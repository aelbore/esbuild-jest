const hq = require('alias-hq')

module.exports = {
  transform: {
    "\\.[jt]sx?$":  [ 'esbuild-jest', { 
        loaders: {
          '.spec.js': 'jsx',
          '.js': 'jsx'
        }
      }
    ]
  },
  testEnvironment: 'jest-environment-jsdom',
  /// This will resolve any tsconfig.compilerOptions.paths
  moduleNameMapper: hq.get('jest'),
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/types/' ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  snapshotFormat: { 
    escapeString: true, // Note: disabling this value leads to failed snapshots!
  },
}