import fs from 'fs'
import path from 'path'

import { expect } from '@jest/globals'
import { defaults } from 'jest-config'

import { display } from '../examples/names-ts/index'

/// using @babel/preset-typescript
/// i was able to us directly the typescript code without bundle the code
import transformer, { Options } from '../src/index'

const process = (sourcePath: string, options?: Options) => {
  const content = fs.readFileSync(sourcePath, 'utf-8')

  const Transformer = transformer.createTransformer({ 
    format: 'esm', 
    sourcemap: true,
    ...(options || {})
  })

  const config = { ...defaults, cwd: path.resolve() } as any
  const output = Transformer.process(content, sourcePath, config) as { code: string, map: string }

  return { ...output }
}

test('esbuild transform option', () => {
    const output = process('./examples/esbuild-define/index.ts', {
        define: {
            "EXAMPLE_VAR": "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        }
    })

    expect(output.code).toEqual(expect.stringContaining("ABCDEFGHIJKLMNOPQRSTUVWXYZ"));
})


test('ts file', () => {
  const names = display()
  expect(names.includes('Jane')).toBeTruthy()
})

test('should have sourcemap with [jest.mock]', () => {
  const output = process('./examples/names-ts/index.spec.ts')

  expect(output.code).toMatchInlineSnapshot(`
    "\\"use strict\\";
    _getJestObj().mock(\\"./index\\", () => {
      return {
        display() {
          return [\\"Joe\\"];
        }
      };
    });
    var _globals = require(\\"@jest/globals\\");
    var _index = require(\\"./index\\");
    function _getJestObj() {
      const {
        jest
      } = require(\\"@jest/globals\\");
      _getJestObj = () => jest;
      return jest;
    }
    test(\\"should parse with [jest.mock]\\", () => {
      (0, _globals.expect)((0, _index.display)()).toEqual([\\"Joe\\"]);
    });
    
    //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnNwZWMudHMiXSwibWFwcGluZ3MiOiI7QUFJQSxjQUFLLEtBQUssV0FBVztBQUNuQixTQUFPO0lBQ0w7QUFDRSxhQUFPLENBQUU7Ozs7QUFQZixJQUFBLFdBQUEsUUFBQTtBQUVBLElBQUEsU0FBQSxRQUFBOzs7Ozs7OztBQVVBLEtBQUssaUNBQWlDO0FBQ3BDLEVBQUEsSUFBQSxTQUFBLFFBQU8sSUFBQSxPQUFBLFlBQVcsUUFBUSxDQUFFOzsiLCJuYW1lcyI6W10sInNvdXJjZXNDb250ZW50IjpudWxsfQ=="
  `)
  
   expect(output.map).toEqual(      {
    version: 3,
    sources: [ 'index.spec.ts' ],
    mappings: ';AAIA,cAAK,KAAK,WAAW;AACnB,SAAO;IACL;AACE,aAAO,CAAE;;;;AAPf,IAAA,WAAA,QAAA;AAEA,IAAA,SAAA,QAAA;;;;;;;;AAUA,KAAK,iCAAiC;AACpC,EAAA,IAAA,SAAA,QAAO,IAAA,OAAA,YAAW,QAAQ,CAAE;;',
    names: [],
    sourcesContent: null
  })
})

test('should have sourcemap without [jest.mock]', () => {
  const output = process('./examples/names-ts/index.ts')
  
  expect(output.code).toMatchInlineSnapshot(`
    "import names from \\"./names\\";
    function display() {
      return names;
    }
    export {
      display
    };

    //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZXhhbXBsZXMvbmFtZXMtdHMvaW5kZXgudHMiXSwibWFwcGluZ3MiOiJBQUFBO0FBRU87QUFDTCxTQUFPO0FBQUE7IiwibmFtZXMiOltdLCJzb3VyY2VzQ29udGVudCI6bnVsbH0="
  `)

  expect(output.map).toEqual({
    version: 3,
    sources: [ './examples/names-ts/index.ts' ],
    mappings: 'AAAA;AAEO;AACL,SAAO;AAAA;',
    names: [],
    sourcesContent: null
  })
})

test('should not have sourcemap [default]', () => {
  const output = process('./examples/names-ts/index.ts', { sourcemap: false })
  expect(output.map).toBeNull()
})
