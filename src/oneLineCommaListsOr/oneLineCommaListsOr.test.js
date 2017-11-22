'use strict'
import test from 'ava'
import oneLineCommaListsOr from './oneLineCommaListsOr'
import {readFromFixture} from '../utils'

const val = 'amaze'

test('includes arrays as comma-separated list on one line with "or"', async (t) => {
  const fruits = ['apple', 'banana', 'kiwi']
  const expected = await readFromFixture(__dirname, 'oneLineCommaListsOr')
  const actual = oneLineCommaListsOr`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `
  t.is(actual, expected)
})
