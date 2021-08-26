/**
 * @jest-environment jsdom
 */

import { afterEach, beforeEach, expect, it } from "@jest/globals"
import * as React from "react"
import { render } from "react-dom"

import App from '../examples/react-jsx/App'


let element

beforeEach(() => {
  element = document.createElement("div");
  document.body.appendChild(element);
})

afterEach(() => {
  element.remove();
});

it("should render [react-jsx]", () => {
  render(<App />, element);
  expect(element.innerHTML).toMatchInlineSnapshot(`"<div>hello world!</div>"`)
})
