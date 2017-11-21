'use strict'

import test from 'ava'
import oneLine from './oneLine'
import {readFromFixture} from '../utils'

const val = 'amaze'

test('reduces text to one line, replacing newlines with spaces', async (t) => {
  const expected = await readFromFixture(__dirname, 'oneLine')
  const actual = oneLine`
    wow such doge
    is very ${val}
    at one line neat
    from multiline
  `
  t.is(actual, expected)
})

test('preserves whitespace within input lines, replacing only newlines', async (t) => {
  const expected = await readFromFixture(__dirname, 'oneLine-sentence')
  const actual = oneLine`
    Sentences also work.  Double
    spacing is preserved.
  `
  t.is(actual, expected)
})
