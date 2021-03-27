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
  // email
  new RegExp('[a-zA-Z_.+0-9-]+@[a-zA-Z._+0-9-]+', 'gmi'),
  // bcrypt hash
  new RegExp('[$][0-9][ayb][$][0-9]{2}[$].{53}', 'gmi'),
  // majority of visa, mastercard and american express credit cars
  new RegExp('[0-9]{4}[- ]?[0-9]{4}[- ]?[0-9]{4}[- ]?[0-9]{3,4}', 'gmi'),
]
