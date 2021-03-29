import { mockedText } from './mocked-text'

export const mockedCreditCardNumbers = [
  '4111 1111 1111 1111',
  '5500 0000 0000 0004',
  '3400 0000 0000 009',
  '3000 0000 0000 04',
  '6011 0000 0000 0004',
  '2014 0000 0000 009',
  '3088 0000 0000 0009',
]

export const mockedNotCreditCardNumbers = [
  '122141241242',
  '233232322323',
  '999900004444',
  '111900000',
  '12',
  '-14242214124',
  '1422523834',
  '-12904912921',
  '000000000000',
]

export const mockedCreditCardNumbersWithText = mockedCreditCardNumbers.map(
  (creditCardNumber) => `${mockedText} ${creditCardNumber} ${mockedText}`,
)
