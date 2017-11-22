'use strict'

import test from 'ava'
import oneLineCommaListsAnd from './oneLineCommaListsAnd'
import {readFromFixture} from '../utils'

const val = 'amaze'

test('includes arrays as comma-separated list on one line with "and"', async (t) => {
  const fruits = ['apple', 'banana', 'kiwi']
  const expected = await readFromFixture(__dirname, 'oneLineCommaListsAnd')
  const actual = oneLineCommaListsAnd`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `
  t.is(actual, expected)
})
