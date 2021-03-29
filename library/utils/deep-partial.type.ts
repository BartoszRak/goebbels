
export type DeepPartial<T> = T extends Function ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends object ? DeepPartialObject<T> : undefined

type DeepPartialObject<T> = {
    [P in keyof T]?: DeepPartialObject<T[P]>
}

interface Person {
    name: string,
    age: number
    mother: {
        age: number
        name: string
        father: {
            age: number
            name: string
        }
    }
}

type A<T> = T extends Array<infer U> ? U : never

const b: A<number[]> = {} as any