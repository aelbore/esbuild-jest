/**
 * @jest-environment jsdom
 */

import { afterEach, beforeEach, expect, it } from "@jest/globals"
import * as React from "react";
import { render } from "react-dom"

import App from '../examples/react-ts/App'

let element: HTMLElement

beforeEach(() => {
  element = document.createElement("div");
  document.body.appendChild(element);
})

afterEach(() => {
  element.remove();
});

it("should render", () => {
  render(<App />, element);
  expect(element.innerHTML).toMatchInlineSnapshot(`"<div>hello world!</div>"`)
});
