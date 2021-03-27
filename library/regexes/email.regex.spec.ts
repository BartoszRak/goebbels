import { emailRegex } from './email.regex'
import {
  mockedEmailsWithText,
  mockedEmails,
  mockedNotEmails,
} from './__mocks__/mocked-emails'

describe('when an email is passed', () => {
  describe.each(mockedEmails)('when testing %p', (email) => {
    it('returns true', () => {
      expect(email).toMatch(emailRegex)
    })
  })
})

describe('when an email with text is passed', () => {
  describe.each(mockedEmailsWithText)('when %p is passed', (emailWithText) => {
    it('returns true', () => {
      expect(emailWithText).toMatch(emailRegex)
    })
  })
})

describe('when not an email is passed', () => {
  describe.each(mockedNotEmails)('when %p is passed', (notEmail) => {
    expect(notEmail).not.toMatch(emailRegex)
  })
})
