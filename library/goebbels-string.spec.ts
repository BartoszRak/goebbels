import { Goebbels } from './goebbels'
import { goebbelsDefaultConfig } from './goebbels.config'
import {
  mockedBcryptHashes,
  mockedNotBcryptHashes,
} from './regexes/__mocks__/mocked-bcrypt-hashes'
import {
  mockedCreditCardNumbers,
  mockedNotCreditCardNumbers,
} from './regexes/__mocks__/mocked-credit-card-numbers'
import {
  mockedEmails,
  mockedNotEmails,
} from './regexes/__mocks__/mocked-emails'

const mockedSecretText = 'secretText'
let goebbels: Goebbels

beforeEach(() => {
  goebbels = new Goebbels({
    detection: {
      text: [
        (text) => text === mockedSecretText,
        new RegExp('1{1}[0-9]{3}', 'gmi'),
      ],
    },
  })
})

describe('when passing a text detected as sensitive', () => {
  describe.each(['1324', '1932', '1999', '1000', mockedSecretText])(
    'when passing %p',
    (value) => {
      describe('when passing a raw text', () => {
        it('returns a redacted text', () => {
          expect(goebbels.redact(value)).toBe(goebbelsDefaultConfig.mask)
        })
      })

      describe('when passing a text wrapped into an array', () => {
        it('returns an array of redacted texts', () => {
          expect(goebbels.redact([value, value, value])).toEqual([
            goebbelsDefaultConfig.mask,
            goebbelsDefaultConfig.mask,
            goebbelsDefaultConfig.mask,
          ])
        })
      })
    },
  )
})

describe('when passing a text not deteced as sensitive', () => {
  describe.each([
    '132',
    `${mockedSecretText}something`,
    `something${mockedSecretText}`,
    'Hello there John!',
  ])('when passing %p', (value) => {
    describe('when passing a raw text', () => {
      it('returns a passed text', () => {
        expect(goebbels.redact(value)).toBe(value)
      })
    })

    describe('when passing a text wrapped into an array', () => {
      it('returns an array of passed texts', () => {
        expect(goebbels.redact([value, value, value])).toEqual([
          value,
          value,
          value,
        ])
      })
    })
  })
})
