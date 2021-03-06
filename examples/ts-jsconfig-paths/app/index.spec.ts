
import { expect, it } from '@jest/globals'
import displaySum from './index'

it('shoudl display the sum', () => {
  expect(displaySum()).toEqual(30)
})