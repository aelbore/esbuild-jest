import fs from 'fs'
import { expect, it } from "@jest/globals"

import { display } from '../examples/names-ts/index'
import { createTransformer } from '../dist/esbuild-jest'

import App from '../examples/react-ts/App'

import { defaults } from 'jest-config'

test('ts file', () => {
  const names = display()
  expect(names.includes('Jane')).toBeTruthy()
})

test('shout have sourcemap', () => {
  const filePath = './examples/names-ts/index.ts'

  const content = fs.readFileSync(filePath, 'utf-8')

  const transformer = createTransformer({ 
    format: 'esm', 
    sourcemap: true 
  })

  const output = transformer.process(content, filePath, { ...defaults, cwd: process.cwd() })

  expect(output.code).toMatchInlineSnapshot(`
  "\\"use strict\\";
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var require_names_ts = __commonJS((exports) => {
    Object.defineProperty(exports, \\"__esModule\\", {
      value: true
    });
    exports.display = display;
    var _names = _interopRequireDefault(require(\\"./names\\"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    function display() {
      return _names.default;
    }
  });
  \\"use strict\\";
  export default require_names_ts();
  
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsTUFBQSxTQUFBLHVCQUFBLFFBQUE7Ozs7QUFFTztBQUNMLFdBQU8sT0FBQTs7OyIsIm5hbWVzIjpbXSwic291cmNlc0NvbnRlbnQiOm51bGx9"
  `)

  expect(output.map).toEqual({
    version: 3,
    sources: [ 'index.ts' ],
    mappings: ';;;;;;;;;;;;;AAAA,MAAA,SAAA,uBAAA,QAAA;;;;AAEO;AACL,WAAO,OAAA;;;',
    names: [],
    sourcesContent: null
  })
})