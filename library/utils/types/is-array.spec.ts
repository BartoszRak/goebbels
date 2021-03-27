import { isArray } from './is-array'

describe.each([
  [{}, false],
  [null, false],
  [undefined, false],
  [[], true],
  [
    new (class Person {
      name: string = 'John'
    })(),
    false,
  ],
  ['mocked-string', false],
  [124124, false],
  [new Error(), false],
  [() => {}, false],
])('when passing %p', (input, expectedOutput) => {
  it(`should return ${expectedOutput}`, () => {
    expect(isArray(input)).toBe(expectedOutput)
  })
})
