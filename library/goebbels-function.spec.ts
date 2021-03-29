import { Goebbels } from "./goebbels";
import { goebbelsDefaultConfig } from "./goebbels.config";

const mockedFunctionName = 'secretFunction'
let goebbels: Goebbels

beforeEach(() => {
    goebbels = new Goebbels({
        detection: {
            function: {
                name: [(name) => name === mockedFunctionName]
            }
        }
    })
})

describe('when function name is detected as sensitive', () => {
    it('returns a function with redacted name', () => {
        expect((goebbels.redact({[mockedFunctionName]: () => {}}[mockedFunctionName]) as any).name).toBe(goebbelsDefaultConfig.mask)
    })
})

describe('when function name is not detected as sensitive', () => {
    it('returns a function with unchanged name', () => {
        expect((goebbels.redact({'notSecretFunction': () => {}}['notSecretFunction']) as any).name).toBe('notSecretFunction')
    })
})