'use strict'

import test from 'ava'
import oneLineCommaLists from './oneLineCommaLists'
import {readFromFixture} from '../utils'

const val = 'amaze'

test('includes arrays as comma-separated list on one line', async (t) => {
  const fruits = ['apple', 'banana', 'kiwi']
  const expected = await readFromFixture('oneLineCommaLists')
  const actual = oneLineCommaLists`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `
  t.is(actual, expected)
})
