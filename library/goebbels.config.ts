import { Detector } from './redactor'
import { objectKeyRegexes, textRegexes } from './regexes'

export interface GoebbelsConfig {
  mask: string
  detection: {
    text: Detector<string>[]
    number: Detector<number>[]
    object: {
      key: Detector<number | string>[]
    }
  }
}

export const goebbelsDefaultConfig: GoebbelsConfig = {
  mask: 'MASKED_DATA',
  detection: {
    text: textRegexes,
    number: [],
    object: {
      key: objectKeyRegexes,
    },
  },
}
