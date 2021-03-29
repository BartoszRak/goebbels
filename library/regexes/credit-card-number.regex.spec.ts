import { creditCardNumberRegex } from './credit-card-number.regex'
import {
  mockedCreditCardNumbers,
  mockedCreditCardNumbersWithText,
} from './__mocks__/mocked-credit-card-numbers'

describe('when an credit card number is passed', () => {
  describe.each(mockedCreditCardNumbers)(
    'when testing %p',
    (creditCardnumber) => {
      it('returns true', () => {
        expect(creditCardnumber).toMatch(creditCardNumberRegex)
      })
    },
  )
})

describe('when an credit card number with text is passed', () => {
  describe.each(mockedCreditCardNumbersWithText)(
    'when %p is passed',
    (creditCardnumberWithText) => {
      it('returns true', () => {
        expect(creditCardnumberWithText).toMatch(creditCardNumberRegex)
      })
    },
  )
})
