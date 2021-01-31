import mockfs from "mock-fs";
import { createTransformer } from "../src/index";

afterEach(() => {
  mockfs.restore();
});

test("ts file", () => {
  const content = `
    import names from './names'  
    export function display() {
      return names
    } 
  `;

  mockfs({
    "./tests/index.spec.ts": content,
  });

  const output = createTransformer().process(content, "./tests/index.spec.ts")

  expect(output.code).toMatchInlineSnapshot(`
    "var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __markAsModule = (target) => __defProp(target, \\"__esModule\\", {value: true});
    var __export = (target, all) => {
      __markAsModule(target);
      for (var name in all)
        __defProp(target, name, {get: all[name], enumerable: true});
    };
    var __exportStar = (target, module2, desc) => {
      __markAsModule(target);
      if (module2 && typeof module2 === \\"object\\" || typeof module2 === \\"function\\") {
        for (let key of __getOwnPropNames(module2))
          if (!__hasOwnProp.call(target, key) && key !== \\"default\\")
            __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
      }
      return target;
    };
    var __toModule = (module2) => {
      if (module2 && module2.__esModule)
        return module2;
      return __exportStar(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, \\"default\\", {value: module2, enumerable: true}), module2);
    };
    __export(exports, {
      display: () => display
    });
    var import_names = __toModule(require(\\"./names\\"));
    function display() {
      return import_names.default;
    }
    "
  `);
});

test("with transformOptions", () => {
  const content = `
    import names from './names'

    export function display() {
      return names
    }
  `;

  mockfs({
    "./tests/index.spec.ts": content,
  });

  const transformer = createTransformer({ 
    format: 'esm', 
    sourcemap: false 
  })

  const output = transformer.process(content, "./tests/index.spec.ts")

  expect(output.code).toMatchInlineSnapshot(`
    "import names from \\"./names\\";
    function display() {
      return names;
    }
    export {
      display
    };
    "
    `);

  expect(output.map).toBeNull();
});

test("with sourcemaps", () => {
  const content = `
    import names from './names'

    export function display() {
      return names
    }
  `;

  mockfs({
    "./tests/index.spec.ts": content,
  });

  const transformer = createTransformer({
    format: "esm",
    sourcemap: true
  })

  const output = transformer.process(content, "./tests/index.spec.ts")

  expect(output.code).toMatchInlineSnapshot(`
    "import names from \\"./names\\";
    function display() {
      return names;
    }
    export {
      display
    };

    //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vdGVzdHMvaW5kZXguc3BlYy50cyJdLCJtYXBwaW5ncyI6IkFBQ0k7QUFFTztBQUNMLFNBQU87QUFBQTsiLCJuYW1lcyI6W10sInNvdXJjZXNDb250ZW50IjpudWxsfQ=="
    `);

  expect(output.map).toEqual({"version":3,"sources":["./tests/index.spec.ts"],"mappings":"AACI;AAEO;AACL,SAAO;AAAA;","names":[],"sourcesContent":null});
});

test("load index.(x)", async () => {
  const content = `
  export default class Foo {
    render() {
      return <div className="hehe">hello there!!!</div>
    }
  }
  `;

  const tests = `
  import React from 'react';
  import ReactTestUtils from 'react-addons-test-utils';
  import Foo from '../src/index';

  const Renderer = ReactTestUtils.createRenderer();

  describe('Example1', () => {
    it('should render correctly', () => {
      Renderer.render(<Foo />);
      const result = Renderer.getRenderOutput();

      expect(result.type).toBe('div');
    });
  });
  `;

  mockfs({
    "./src/index.tsx": content,
    "./tests/index.spec.ts": tests,
  });

  const transformer = createTransformer({
    format: "esm",
    sourcemap: false,
    loaders: {
      '.spec.ts': 'tsx'
    }   
  })

  const output = transformer.process(tests, "./tests/index.spec.ts");

  expect(output.code).toMatchInlineSnapshot(`
    "import React from \\"react\\";
    import ReactTestUtils from \\"react-addons-test-utils\\";
    import Foo from \\"../src/index\\";
    const Renderer = ReactTestUtils.createRenderer();
    describe(\\"Example1\\", () => {
      it(\\"should render correctly\\", () => {
        Renderer.render(/* @__PURE__ */ React.createElement(Foo, null));
        const result = Renderer.getRenderOutput();
        expect(result.type).toBe(\\"div\\");
      });
    });
    "
  `)

  expect(output.map).toBeNull();
});
