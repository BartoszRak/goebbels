import { Goebbels } from 'library/goebbels'
import { ObjectRedactor } from './object-redactor'

const mockedMask = '**MOCKED-MASK**'
let redactor: ObjectRedactor
let mockedRedact: jest.Mocked<Goebbels['redact']>
let result: unknown

beforeEach(() => {
  redactor = new ObjectRedactor(mockedMask, [
    new RegExp('secret-key', 'gmi'),
    (value) => Number(value) * 2 === 30,
  ])
})

describe('redact()', () => {
  describe('when passing object to redact', () => {
    beforeEach(() => {
      mockedRedact = jest.fn(
        (value) => `--- "${value}" passed to being redacted`,
      )
      result = redactor.redact(
        {
          15: '15-key-value',
          'secret-key': 'secret-key-value',
          name: 'John',
          lastName: 'Patton',
          family: {
            mother: true,
            father: true,
          },
          pets: ['cat', 'dog'],
        },
        mockedRedact,
      )
    })

    it('returns a redacted object', () => {
      expect(result).toMatchInlineSnapshot(`
        Object {
          "15": "**MOCKED-MASK**",
          "family": "--- \\"[object Object]\\" passed to being redacted",
          "lastName": "--- \\"Patton\\" passed to being redacted",
          "name": "--- \\"John\\" passed to being redacted",
          "pets": "--- \\"cat,dog\\" passed to being redacted",
          "secret-key": "**MOCKED-MASK**",
        }
      `)
    })

    it('calls passed redact function for every value that is not redacted by key', () => {
      expect(mockedRedact).toHaveBeenCalledTimes(4)
    })
  })
})
