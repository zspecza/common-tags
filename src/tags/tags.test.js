'use strict'

import test from 'ava'
import tags from './tags'

const tag = tags()

test('tags returns a function', (t) => {
  t.true(typeof tag === 'function')
})

test('default returned tag just trims outer padding', (t) => {
  const expected = 'wow such doge'
  const actual = tag`   wow such doge   `
  t.is(actual, expected)
})

test('does not trim if trim setting is false', (t) => {
  const tag = tags({ trim: false })
  const expected = '  wow such doge  '
  const actual = tag`  wow such doge  `
  t.is(actual, expected)
})
