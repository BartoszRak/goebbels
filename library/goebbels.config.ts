import { Detector } from './redactor'
import { objectKeyRegexes, textRegexes } from './regexes'

export interface GoebbelsConfig {
  mask: string
  detection: {
    error: {
      name: Detector<string>[],
      message: Detector<string>[],
      stack: Detector<string>[],
    }
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
    error: {
      name: textRegexes,
      message: textRegexes,
      stack: [],
    },
    text: textRegexes,
    number: [],
    object: {
      key: objectKeyRegexes,
    },
  },
}