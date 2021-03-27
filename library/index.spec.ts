import { foo } from "./index"

describe('foo()', () => {
    it('returns proper value', () => {
        expect(foo()).toBe('bar')
    })
})