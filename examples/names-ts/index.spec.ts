import { expect } from "@jest/globals"

import { display } from './index'

test('should parse with [jest.mock]', () => {
  expect(display()).toEqual([ 'Joe' ])  
})

jest.mock('./index', () => {
  return {
    display() {
      return [ 'Joe' ]
    }
  }
})
