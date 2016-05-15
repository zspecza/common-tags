'use strict'

import test from 'ava'
import oneLine from './oneLine'
import {readFromFixture} from '../utils'

const val = 'amaze'

test('reduces text to one line, replacing newlines with spaces', async (t) => {
  const expected = await readFromFixture('oneLine')
  const actual = oneLine`
    wow such doge
    is very ${val}
    at one line neat
    from multiline
  `
  t.is(actual, expected)
})
