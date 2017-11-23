'use strict'

import test from 'ava'
import commaListsOr from './commaListsOr'
import {readFromFixture} from '../utils'

const val = 'amaze'

test('includes arrays as comma-separated list with "or"', async (t) => {
  const fruits = ['apple', 'banana', 'kiwi']
  const expected = await readFromFixture(__dirname, 'commaListsOr')
  const actual = commaListsOr`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `
  t.is(actual, expected)
})

test('only returns the first item of a single element array', async (t) => {
  const fruits = ['apple']
  const expected = await readFromFixture(__dirname, 'commaListsOrSingleItem')
  const actual = commaListsOr`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `
  t.is(actual, expected)
})
