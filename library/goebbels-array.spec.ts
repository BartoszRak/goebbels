import { Goebbels } from './goebbels'

const mockedSecretKey = 'secret-key'
const mockedSecretText = 'secret-text'

let goebbels: Goebbels

beforeEach(() => {
  goebbels = new Goebbels({
    detection: {
      text: [(text) => text === mockedSecretText],
      number: [new RegExp('22(44)?88', 'gmi')],
      object: {
        key: [
          (value) => value === mockedSecretKey,
          new RegExp('secret-key-by-regex[0-9]+', 'gmi'),
        ],
      },
    },
  })
})

describe('when array contains sensitive values', () => {
  it('returns a properly redacted array', () => {
    expect(
      goebbels.redact([
        {
          'secret-key-by-regex22': 'someData1',
          'secret-key-by-regex12332': 'someData2',
          name: 'John',
          adult: true,
          pets: ['cat', 'dog'],
        },
        {
          [mockedSecretKey]: 'someData1',
          friend: {
            name: 'George',
            [mockedSecretKey]: 'someDataOfFriend1',
            friend: {
              age: 15,
              [mockedSecretKey]: 'someDataOfFriendOfFriend1',
            },
          },
        },

        2288,
        224488,
        mockedSecretText,
      ]),
    )
  })
})

describe('when array contains no sensitive values', () => {
  it('returns a passed array', () => {
    expect(
      goebbels.redact([
        {
          name: 'John',
          age: 15,
          mother: {
            name: 'Kelly',
          },
        },
        12312,
        9999999,
        'Hello there!',
      ]),
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "age": 15,
          "mother": Object {
            "name": "Kelly",
          },
          "name": "John",
        },
        12312,
        9999999,
        "Hello there!",
      ]
    `)
  })
})
