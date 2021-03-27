import { isFunction } from './is-function'

describe.each([
  [{}, false],
  [null, false],
  [undefined, false],
  [[], false],
  [
    new (class Person {
      name: string = 'John'
    })(),
    false,
  ],
  ['mocked-string', false],
  [124124, false],
  [new Error(), false],
  [() => {}, true],
])('when passing %p', (input, expectedOutput) => {
  it(`should return ${expectedOutput}`, () => {
    expect(isFunction(input)).toBe(expectedOutput)
  })
})
