import { deepMerge } from './deep-merge'

const baseObject = {
  name: 'John',
  lastName: 'Patton',
  age: 15,
  parents: {
    mother: 1,
    father: 1,
  },
  pets: ['dog'],
}

const additionObject = {
  name: 'George',
  lastName: 'McDonald',
  age: 15,
  parents: {
    mother: {
      name: 'Kelly',
      age: 40,
    },
    father: {
      name: 'James',
      age: 43,
    },
    doesHaveParents: true,
  },
  pets: ['cat', 'parrot'],
}
let result: unknown

describe('when merging without arrays merge', () => {
  beforeEach(() => {
    result = deepMerge(baseObject, additionObject)
  })

  it('returns merged object with merged arrays', () => {
    expect(result).toMatchInlineSnapshot(`
      Object {
        "age": 15,
        "lastName": "McDonald",
        "name": "George",
        "parents": Object {
          "doesHaveParents": true,
          "father": Object {
            "age": 43,
            "name": "James",
          },
          "mother": Object {
            "age": 40,
            "name": "Kelly",
          },
        },
        "pets": Array [
          "cat",
          "parrot",
        ],
      }
    `)
  })
})

describe('when merging with arrays merge', () => {
  beforeEach(() => {
    result = deepMerge(baseObject, additionObject, true)
  })

  it('returns merged object with merged arrays', () => {
    expect(result).toMatchInlineSnapshot(`
      Object {
        "age": 15,
        "lastName": "McDonald",
        "name": "George",
        "parents": Object {
          "doesHaveParents": true,
          "father": Object {
            "age": 43,
            "name": "James",
          },
          "mother": Object {
            "age": 40,
            "name": "Kelly",
          },
        },
        "pets": Array [
          "dog",
          "cat",
          "parrot",
        ],
      }
    `)
  })
})
