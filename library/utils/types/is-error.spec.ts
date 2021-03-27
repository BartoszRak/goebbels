import { isError } from './is-error'

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
  [new Error(), true],
  [() => {}, false],
])('when passing %p', (input, expectedOutput) => {
  it(`should return ${expectedOutput}`, () => {
    expect(isError(input)).toBe(expectedOutput)
  })
})
