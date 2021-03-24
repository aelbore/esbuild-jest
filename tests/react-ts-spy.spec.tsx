import * as React from "react";
import { render } from "react-dom";
import { afterEach, beforeEach, expect, it, jest } from "@jest/globals";

import App from '../examples/react-ts/App'

let element: HTMLElement

beforeEach(() => {
  element = document.createElement("div");
  document.body.appendChild(element);
})

afterEach(() => {
  element.remove();
})

it("should render with jest.spyOn", () => {
  jest.spyOn(React, 'useEffect');
  render(<App />, element);
  expect(element.innerHTML).toMatchInlineSnapshot(`"<div>hello world!</div>"`);
});
