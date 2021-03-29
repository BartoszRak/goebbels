import { Goebbels } from './goebbels'
import { goebbelsDefaultConfig } from './goebbels.config'

const mockedSecretKey = 'secret-key'

let goebbels: Goebbels

beforeEach(() => {
  goebbels = new Goebbels({
    detection: {
      object: {
        key: [
          (value) => value === mockedSecretKey,
          new RegExp('secret-key-by-regex[0-9]+', 'gmi'),
        ],
      },
    },
  })
})

describe('when object has key detected as sensitive information indicator', () => {
  describe.each([
    [
      {
        'secret-key-by-regex22': 'someData1',
        'secret-key-by-regex12332': 'someData2',
        name: 'John',
        adult: true,
        pets: ['cat', 'dog'],
      },
      {
        'secret-key-by-regex22': goebbelsDefaultConfig.mask,
        'secret-key-by-regex12332': goebbelsDefaultConfig.mask,
        name: 'John',
        adult: true,
        pets: ['cat', 'dog'],
      },
    ],
    [
      {
        'secret-key-by-regex0': 'someData1',
        [mockedSecretKey]: 'someData2',
        parents: [
          {
            name: 'Kelly',
            role: 'mother',
          },
          {
            name: 'James',
            role: 'father',
          },
        ],
      },
      {
        'secret-key-by-regex0': goebbelsDefaultConfig.mask,
        [mockedSecretKey]: goebbelsDefaultConfig.mask,
        parents: [
          {
            name: 'Kelly',
            role: 'mother',
          },
          {
            name: 'James',
            role: 'father',
          },
        ],
      },
    ],
    [
      {
        [mockedSecretKey]: 'someData1',
        name: 'James',
      },
      {
        [mockedSecretKey]: goebbelsDefaultConfig.mask,
        name: 'James',
      },
    ],
    [
        {
            [mockedSecretKey]: 'someData1',
            friend: {
                name: 'George',
                [mockedSecretKey]: 'someDataOfFriend1',
                friend: {
                    age: 15,
                    [mockedSecretKey]: 'someDataOfFriendOfFriend1'
                }
            }
        },
        {
            [mockedSecretKey]: goebbelsDefaultConfig.mask,
            friend: {
                name: 'George',
                [mockedSecretKey]: goebbelsDefaultConfig.mask,
                friend: {
                    age: 15,
                    [mockedSecretKey]: goebbelsDefaultConfig.mask
                }
            }
        }
    ]
  ])('when passing %p', (inputObj, expectedOutputObj) => {
    describe('when passing a raw object', () => {
      it('returns a redacted object', () => {
        expect(goebbels.redact(inputObj)).toStrictEqual(expectedOutputObj)
      })
    })

    describe('when passing objects wrapped into an array', () => {
      it('returns an array of redacted objects', () => {
        expect(goebbels.redact([inputObj, inputObj, inputObj])).toStrictEqual([
          expectedOutputObj,
          expectedOutputObj,
          expectedOutputObj,
        ])
      })
    })
  })
})

describe('when object has no key detected as sensitive information indicator', () => {
  describe.each([
    {
      'secret-key-by-regex': 'someData1',
      something: 'someData2',
      name: 'John',
      adult: true,
      pets: ['cat', 'dog'],
    },
    {
      'secret-key-by-regex': 'someData1',
      [`${mockedSecretKey}invalid`]: 'someData2',
      parents: [
        {
          name: 'Kelly',
          role: 'mother',
        },
        {
          name: 'James',
          role: 'father',
        },
      ],
    },
    {
      [`${mockedSecretKey}something`]: 'someData1',
      getName: () => 'James',
    },
  ])('when passing %p', (inputObj) => {
    describe('when passing a raw object', () => {
      it('returns a passed object', () => {
        expect(goebbels.redact(inputObj)).toStrictEqual(inputObj)
      })
    })

    describe('when passing objects wrapped into an array', () => {
      it('returns a passed array of objects', () => {
        expect(goebbels.redact([inputObj, inputObj, inputObj])).toStrictEqual([
          inputObj,
          inputObj,
          inputObj,
        ])
      })
    })
  })
})
