import { expect } from "@jest/globals"

import { display } from './index'

jest.mock('./index', () => {
  return {
    display() {
      return [ 'Joe' ]
    }
  }
})

test('should parse with [jest.mock]', () => {
  expect(display()).toEqual([ 'Joe' ])  
})