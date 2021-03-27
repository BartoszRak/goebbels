import { bcryptHashRegex } from "./bcrypt-hash.regex"
import { mockedBcryptHashes, mockedBcryptHashesWithText, mockedNotBcryptHashes } from "./__mocks__/mocked-bcrypt-hashes"

describe('when a bcrypt hash is passed', () => {
    describe.each(mockedBcryptHashes)('when testing %p', (bcryptHash) => {
        it('returns true', () => {
          expect(bcryptHash).toMatch(bcryptHashRegex)
        })
      })
})

describe('when a bcrypt hash with text is passed', () => {
    describe.each(mockedBcryptHashesWithText)('when %p is passed', (bcryptHashWithText) => {
        it('returns true', () => {
          expect(bcryptHashWithText).toMatch(bcryptHashRegex)
        })
      })
})

describe('when not a bcrypt hash is passed', () => {
    describe.each(mockedNotBcryptHashes)('when %p is passed', (notBcryptHash) => {
        expect(notBcryptHash).not.toMatch(bcryptHashRegex)
      })
})