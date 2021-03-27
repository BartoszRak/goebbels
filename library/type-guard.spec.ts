import { TypeGuard } from './type-guard'

let guard: TypeGuard

beforeEach(() => {
  guard = new TypeGuard()
})

describe('isObject()', () => {
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
      expect(guard.isObject(input)).toBe(expectedOutput)
    })
  })
})

describe('isString()', () => {
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
      expect(guard.isString(input)).toBe(expectedOutput)
    })
  })
})

describe('isNumber()', () => {
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
      expect(guard.isNumber(input)).toBe(expectedOutput)
    })
  })
})

describe('isError()', () => {
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
      expect(guard.isError(input)).toBe(expectedOutput)
    })
  })
})

describe('isFunction()', () => {
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
      expect(guard.isFunction(input)).toBe(expectedOutput)
    })
  })
})

describe('isArray()', () => {
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
      expect(guard.isArray(input)).toBe(expectedOutput)
    })
  })
})
