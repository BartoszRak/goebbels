import { Goebbels } from './goebbels'
import { goebbelsDefaultConfig } from './goebbels.config'

let goebbels: Goebbels

beforeEach(() => {
  goebbels = new Goebbels({
    detection: {
      number: [(num) => num % 2 === 1, new RegExp('22(44)?88', 'gmi')],
    },
  })
})

describe('when passing a number detected as sensitive', () => {
  describe.each([13, 17, 555555, 55433, 2288, 224488])(
    'when passing %p',
    (value) => {
      describe('when passing a raw value', () => {
        it('returns a redacted value', () => {
          expect(goebbels.redact(value)).toBe(goebbelsDefaultConfig.mask)
        })
      })

      describe('when passing a value wrapped by an array', () => {
        it('returns a redacted value', () => {
          expect(goebbels.redact([value, value, value])).toEqual([
            goebbelsDefaultConfig.mask,
            goebbelsDefaultConfig.mask,
            goebbelsDefaultConfig.mask,
          ])
        })
      })
    },
  )
})

describe('when passing a number not detected as sensitive', () => {
  describe.each([12, 14, 20480, 58])('when passing %p', (value) => {
    describe('when passing a raw value', () => {
      it('returns a passed value', () => {
        expect(goebbels.redact(value)).toBe(value)
      })
    })

    describe('when passing a value wrapped into an array', () => {
      it('returns a passed array of values', () => {
        expect(goebbels.redact([value, value, value])).toEqual([
          value,
          value,
          value,
        ])
      })
    })
  })
})
