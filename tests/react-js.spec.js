import { afterEach, beforeEach, expect, it } from "@jest/globals"
import * as React from "react"
import { render } from "react-dom"

import App from '../examples/react-js/App'

let element

beforeEach(() => {
  element = document.createElement("div");
  document.body.appendChild(element);
})

afterEach(() => {
  element.remove();
});

it("should render [react-js]", () => {
  render(<App />, element);
  expect(element.innerHTML).toMatchInlineSnapshot(`"<div>hello world!</div>"`)
})
