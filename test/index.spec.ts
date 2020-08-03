import mockfs from 'mock-fs'
import * as fs from 'fs'
import { code } from './code'

afterEach(() => {
  mockfs.restore()
})

test(`Basic example`, async () => {
  mockfs({
    './src/input.ts': code
  })

  const content = await fs.promises.readFile('./src/input.ts', 'utf-8')
  expect(content).toEqual(code)
});

test('Nullish Coalescing, Optional Chaining', () => {
  const response = {
    data: [
      { age: 30, name: 'Jane' }
    ]
  }

  expect(response.data).toBeTruthy()
  // @ts-ignore
  expect(response?.status).toBeFalsy()
})