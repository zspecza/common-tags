'use strict'

import test from 'ava'
import oneLineInlineLists from './oneLineInlineLists'
import {readFromFixture} from '../utils'

const val = 'amaze'

test('includes arrays as inline list on one line', async (t) => {
  const fruits = ['apple', 'banana', 'kiwi']
  const expected = await readFromFixture('oneLineInlineLists')
  const actual = oneLineInlineLists`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `
  t.is(actual, expected)
})
