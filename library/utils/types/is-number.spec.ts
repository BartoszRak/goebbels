import { isNumber } from './is-number'

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
  [124124, true],
  [new Error(), false],
  [() => {}, false],
])('when passing %p', (input, expectedOutput) => {
  it(`should return ${expectedOutput}`, () => {
    expect(isNumber(input)).toBe(expectedOutput)
  })
})
