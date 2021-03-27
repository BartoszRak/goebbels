import { isObject } from './is-object'

describe.each([
  [{}, true],
  [null, false],
  [undefined, false],
  [[], false],
  [
    new (class Person {
      name: string = 'John'
    })(),
    true,
  ],
  ['mocked-string', false],
  [124124, false],
  [new Error(), false],
  [() => {}, false],
])('when passing %p', (input, expectedOutput) => {
  it(`should return ${expectedOutput}`, () => {
    expect(isObject(input)).toBe(expectedOutput)
  })
})
