import { StringRedactor } from "./string-redactor";


const mockedMask = '**MOCKED-MASK**'
let redactor: StringRedactor

beforeEach(() => {
    redactor = new StringRedactor(mockedMask, [
        (value) => value.length > 10,
        new RegExp('[01]+', 'gmi')
    ])
})

describe('redact()', () => {
    describe('when values doesnt match any detector', () => {
        it('returns back passed value', () => {
            expect(redactor.redact('99999')).toBe('99999')
        })
    })

    describe('when value matches one of detectors', () => {
        it('returns a mask', () => {
            expect(redactor.redact('2041')).toBe(mockedMask)
        })
    })

    describe('when value matches all detectors', () => {
        it('returns a mask', () => {
            expect(redactor.redact('1010101001010101010')).toBe(mockedMask)
        })
    })
})