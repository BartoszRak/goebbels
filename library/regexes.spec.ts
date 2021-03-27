import { emailRegex } from './regexes'

const loremIpsumText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const emails = [
  'simple@example.com',
  'very.common@example.com',
  'disposable.style.email.with+symbol@example.com',
  'other.email-with-hyphen@example.com',
  'fully-qualified-domain@example.com',
  'user.name+tag+sorting@example.com',
  'x@example.com',
  'example-indeed@strange-example.com',
  'admin@mailserver1',
  'example@s.example',
  '" "@example.org',
  '"john..doe"@example.org',
  'mailhost!username@example.org',
  'user%example.com@example.org',
  'user-@example.org',
]

const emailsWithText = emails.map(
  (email) => `${loremIpsumText} ${email} ${loremIpsumText}`,
)

describe('email regex', () => {
  describe('when only email is passed', () => {
    describe.each(emails)('when testing %p', (email) => {
      it('returns true', () => {
          console.log('###', email, emailRegex)
        expect(email).toMatch(emailRegex)
      })
    })
  })

  describe.each(emailsWithText)(
    'when email with text is passed',
    (emailWithText) => {
      it('returns true', () => {
        expect(emailWithText).toMatch(emailRegex)
      })
    },
  )
})
