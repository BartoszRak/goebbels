import { isString } from './is-string'

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
  ['mocked-string', true],
  [124124, false],
  [new Error(), false],
  [() => {}, false],
])('when passing %p', (input, expectedOutput) => {
  it(`should return ${expectedOutput}`, () => {
    expect(isString(input)).toBe(expectedOutput)
  })
})
