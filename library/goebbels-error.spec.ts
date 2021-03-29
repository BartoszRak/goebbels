import { Goebbels } from './goebbels'
import { goebbelsDefaultConfig } from './goebbels.config'
import { Detector } from './redactor'
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

const mockedSecret = 'mocked-secret'
const mockedErrorDetectors: Detector<string>[] = [
  new RegExp('22(maybe)?hello[0-9]*', 'gmi'),
  (value) => value === mockedSecret,
]

let goebbels: Goebbels
let mockedError: Error

beforeEach(() => {
  goebbels = new Goebbels({
    detection: {
      error: {
        name: mockedErrorDetectors,
        message: mockedErrorDetectors,
        stack: mockedErrorDetectors,
      },
    },
  })
  mockedError = new Error()
})

describe('when error contains value detected as sensitive', () => {
  describe.each([
    mockedSecret,
    '22hello',
    '22maybehello',
    '22maybehello124124',
    '22hello999',
  ])('when passing %p', (value) => {
    describe('when error name is sensitive', () => {
      beforeEach(() => {
        mockedError.name = value
      })

      it('returns error with redacted name', () => {
        expect((goebbels.redact(mockedError) as Error).name).toBe(
          goebbelsDefaultConfig.mask,
        )
      })
    })

    describe('when an error message is sensitive', () => {
      beforeEach(() => {
        mockedError.message = value
      })

      it('returns an error with redacted message', () => {
        expect((goebbels.redact(mockedError) as Error).message).toBe(
          goebbelsDefaultConfig.mask,
        )
      })
    })

    describe('when an error stack is sensitive', () => {
      beforeEach(() => {
        mockedError.stack = value
      })

      it('returns an error with redacted message', () => {
        expect((goebbels.redact(mockedError) as Error).stack).toBe(
          goebbelsDefaultConfig.mask,
        )
      })
    })

    describe('when an error name and message are sensitive', () => {
      beforeEach(() => {
        mockedError.name = value
        mockedError.message = value
      })

      it('returns an error with a redacted message and name', () => {
        expect((goebbels.redact(mockedError) as Error).name).toBe(
          goebbelsDefaultConfig.mask,
        )
        expect((goebbels.redact(mockedError) as Error).message).toBe(
          goebbelsDefaultConfig.mask,
        )
      })
    })
  })
})

describe('when error doesnt contain a value detected as sensitive', () => {
  describe.each([
    'hello999',
    'maybehello1212',
    'hello',
    'How are you james?',
    '/stack/stack/somewhere.js',
  ])('when passing %p', (value) => {
    beforeEach(() => {
      mockedError.name = value
      mockedError.stack = value
      mockedError.message = value
    })

    it('returns an error unchagned', () => {
      expect((goebbels.redact(mockedError) as Error).name).toBe(value)
      expect((goebbels.redact(mockedError) as Error).message).toBe(value)
      expect((goebbels.redact(mockedError) as Error).stack).toBe(value)
    })
  })
})
