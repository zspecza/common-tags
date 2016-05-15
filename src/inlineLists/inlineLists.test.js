'use strict'
import test from 'ava'
import inlineLists from './inlineLists'
import {readFromFixture} from '../utils'

const val = 'amaze'

test('includes arrays as space-separated list', async (t) => {
  const fruits = ['apple', 'banana', 'kiwi']
  const expected = await readFromFixture('inlineLists')
  const actual = inlineLists`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `
  t.is(actual, expected)
})
