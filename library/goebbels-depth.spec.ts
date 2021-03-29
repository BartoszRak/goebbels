import { DeepPartial } from 'utility-types'
import { Goebbels } from './goebbels'
import { GoebbelsConfig } from './goebbels.config'

const detectionConfiguration: DeepPartial<GoebbelsConfig['detection']> = {
  text: [new RegExp('secret-text[0-9]+', 'gmi')],
}

let goebbels: Goebbels

beforeEach(() => {
  goebbels = new Goebbels({
    depth: 6,
    detection: detectionConfiguration,
  })
})

describe('when redacting a nested array', () => {
  it('returns a nested array redacted only to specific depth', () => {
    expect(
      goebbels.redact([
        'secret-text1',
        'something1',
        [
          'secret-text2',
          'something2',
          [
            'secret-text3',
            'something3',
            [
              'secret-text4',
              'something4',
              [
                'secret-text5',
                'something5',
                [
                  'secret-text6',
                  'something6',
                  [
                    'secret-text7',
                    'something7',
                    [
                      'secret-text8',
                      'something8',
                      ['secret-text9', 'something9'],
                    ],
                  ],
                ],
              ],
            ],
          ],
        ],
      ]),
    ).toMatchInlineSnapshot(`
      Array [
        "**MASKED_DATA**",
        "something1",
        Array [
          "**MASKED_DATA**",
          "something2",
          Array [
            "**MASKED_DATA**",
            "something3",
            Array [
              "**MASKED_DATA**",
              "something4",
              Array [
                "**MASKED_DATA**",
                "something5",
                Array [
                  "**MASKED_DATA**",
                  "something6",
                  Array [
                    "secret-text7",
                    "something7",
                    Array [
                      "secret-text8",
                      "something8",
                      Array [
                        "secret-text9",
                        "something9",
                      ],
                    ],
                  ],
                ],
              ],
            ],
          ],
        ],
      ]
    `)
  })
})
