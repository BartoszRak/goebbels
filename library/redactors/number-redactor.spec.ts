import { NumberRedactor } from "./number-redactor";


const mockedMask = '**MOCKED-MASK**'
let redactor: NumberRedactor

beforeEach(() => {
    redactor = new NumberRedactor(mockedMask, [
        (value) => value % 2 === 1,
        new RegExp('[24]+', 'gmi')
    ])
})

describe('redact()', () => {
    describe('when values doesnt match any detector', () => {
        it('returns back passed value', () => {
            expect(redactor.redact(6888686)).toBe(6888686)
        })
    })

    describe('when value matches one of detectors', () => {
        it('returns a mask', () => {
            expect(redactor.redact(333)).toBe(mockedMask)
        })
    })

    describe('when value matches all detectors', () => {
        it('returns a mask', () => {
            expect(redactor.redact(2424553311)).toBe(mockedMask)
        })
    })
})