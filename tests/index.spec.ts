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

test('ts file', () => {
  const names = display()
  expect(names.includes('Jane')).toBeTruthy()
})

test('should have sourcemap with [jest.mock]', () => {
  const output = process('./examples/names-ts/index.spec.ts')
  expect(output.code).toMatchInlineSnapshot(`
    "_getJestObj().mock(\\"./index\\", () => {
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
    
    //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnNwZWMudHMiXSwibWFwcGluZ3MiOiJBQUlBLFlBQUEsRUFBS0EsS0FBSyxXQUFXLE1BQU07QUFDekIsU0FBTztJQUNMQyxVQUFVO0FBQ1IsYUFBTyxDQUFFLEtBQUY7SUFDUjtFQUhJO0FBS1IsQ0FORDtBQUpBLElBQUEsV0FBQSxRQUFBLGVBQUE7QUFFQSxJQUFBLFNBQUEsUUFBQSxTQUFBOzs7Ozs7OztBQVVBQyxLQUFLLGlDQUFpQyxNQUFNO0FBQzFDLEdBQUEsR0FBQSxTQUFBLFNBQU8sR0FBQSxPQUFBLFNBQUEsQ0FBUCxFQUFrQkMsUUFBUSxDQUFFLEtBQUYsQ0FBMUI7QUFDRCxDQUZHOyIsIm5hbWVzIjpbIm1vY2siLCJkaXNwbGF5IiwidGVzdCIsInRvRXF1YWwiXSwic291cmNlc0NvbnRlbnQiOm51bGx9"
  `)
  
   expect(output.map).toEqual(      {
    version: 3,
    sources: [ 'index.spec.ts' ],
    mappings: 'AAIA,YAAA,EAAKA,KAAK,WAAW,MAAM;AACzB,SAAO;IACLC,UAAU;AACR,aAAO,CAAE,KAAF;IACR;EAHI;AAKR,CAND;AAJA,IAAA,WAAA,QAAA,eAAA;AAEA,IAAA,SAAA,QAAA,SAAA;;;;;;;;AAUAC,KAAK,iCAAiC,MAAM;AAC1C,GAAA,GAAA,SAAA,SAAO,GAAA,OAAA,SAAA,CAAP,EAAkBC,QAAQ,CAAE,KAAF,CAA1B;AACD,CAFG;',
    names: ['mock', 'display', 'test', 'toEqual'],
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

    //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZXhhbXBsZXMvbmFtZXMtdHMvaW5kZXgudHMiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVztBQUVYLFNBQVMsVUFBVTtBQUN4QixTQUFPO0FBQ1Q7IiwibmFtZXMiOltdLCJzb3VyY2VzQ29udGVudCI6bnVsbH0="
  `)

  expect(output.map).toEqual({
    version: 3,
    sources: [ './examples/names-ts/index.ts' ],
    mappings: 'AAAA,OAAO,WAAW;AAEX,SAAS,UAAU;AACxB,SAAO;AACT;',
    names: [],
    sourcesContent: null
  })
})

test('should not have sourcemap [default]', () => {
  const output = process('./examples/names-ts/index.ts', { sourcemap: false })
  expect(output.map).toBeNull()
})