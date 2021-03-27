import { emailRegex } from "./email.regex"
import { bcryptHashRegex } from './bcrypt-hash.regex'
import { creditCardNumberRegex } from './credit-card-number.regex'

export const objectKeyRegexes: RegExp[] = [
  new RegExp('h+a+s+h+(e*s+)*', 'gmi'),
  new RegExp('p+a+s+w+o+r+d+s*', 'gmi'),
  new RegExp('e+m+a+i+l+s*', 'gmi'),
  new RegExp('t+o+k+e+n+s*', 'gmi'),
  new RegExp('l+a+s+t+n+a+m+e+s*', 'gmi'),
  new RegExp('f+i+r+s+t+n+a+m+e+s*', 'gmi'),
  new RegExp('p+h+o+n+e+n+u+m+b+e+r+s*', 'gmi'),
]

export const textRegexes: RegExp[] = [
  emailRegex,
  bcryptHashRegex,
  creditCardNumberRegex,
]
