/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { render } from "react-dom";
import { afterEach, beforeEach, expect, it, jest } from "@jest/globals";

import App from '../examples/react-ts/App'

jest.mock("../examples/react-ts/App", () => {
  return function () {
    return <div>boo world</div>;
  };
});

let element: HTMLElement

beforeEach(() => {
  element = document.createElement("div");
  document.body.appendChild(element);
})

afterEach(() => {
  element.remove()
})

it("should render with jest.mock", () => {
  render(<App />, element)
  expect(element.innerHTML).toMatchInlineSnapshot(`"<div>boo world</div>"`);
});
