import { FunctionRedactor } from './function-redactor'

const mockedMask = '** MASK **'
let redactor: FunctionRedactor

beforeEach(() => {
  redactor = new FunctionRedactor(mockedMask, [
    (value) => value.length > 10,
    new RegExp('[01]+', 'gmi'),
  ])
})

describe('redact()', () => {
  let result: Function

  describe('when values doesnt match any detector', () => {
    beforeEach(() => {
      result = redactor.redact({ '99999': () => {} }['99999'])
    })

    it('returns back passed value', () => {
      expect(result.name).toBe('99999')
    })
  })

  describe('when value matches one of detectors', () => {
    beforeEach(() => {
      result = redactor.redact({ '2041': () => {} }['2041'])
    })

    it('returns a mask', () => {
      expect(result.name).toBe(mockedMask)
    })
  })

  describe('when value matches all detectors', () => {
    beforeEach(() => {
      result = redactor.redact(
        { '1010101001010101010': () => {} }['1010101001010101010'],
      )
    })

    it('returns a mask', () => {
      expect(result.name).toBe(mockedMask)
    })
  })
})
