import { Detector } from 'library/redactor'
import { ErrorRedactor } from './error-redactor'

const mockedMask = '**MOCKED-MASK**'
const mockedDetectors: Detector<string>[] = [
  (value) => value.length > 10,
  new RegExp('[01]+', 'gmi'),
]
let redactor: ErrorRedactor

beforeEach(() => {
  redactor = new ErrorRedactor(
    mockedMask,
    mockedDetectors,
    mockedDetectors,
    mockedDetectors,
  )
})

describe('redact()', () => {
  let mockedError: Error

  beforeEach(() => {
    mockedError = new Error()
  })

  describe.each<keyof Error>(['stack', 'message', 'name'])(
    'when redacting %p',
    (property) => {
      describe('when values doesnt match any detector', () => {
        beforeEach(() => {
          mockedError[property] = '99999'
        })

        it('returns unchanged Error', () => {
          expect(redactor.redact(mockedError)[property]).toBe('99999')
        })
      })

      describe('when value matches one of detectors', () => {
        beforeEach(() => {
          mockedError[property] = '2041'
        })

        it(`returns an Error with "${property}" filled with mask`, () => {
          expect(redactor.redact(mockedError)[property]).toBe(mockedMask)
        })
      })

      describe('when value matches all detectors', () => {
        beforeEach(() => {
          mockedError[property] = '1010101001010101010'
        })

        it(`returns an Error with "${property}" filled with mask`, () => {
          expect(redactor.redact(mockedError)[property]).toBe(mockedMask)
        })
      })
    },
  )
})
