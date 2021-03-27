import { mockedText } from "./mocked-text"

export const mockedEmails = [
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

export const mockedNotEmails = [
    'John James',
    'Destroyer_15',
    '@@@@XD',
    'XD@@@@',
]

export const mockedEmailsWithText = mockedEmails.map(
  (email) => `${mockedText} ${email} ${mockedText}`,
)