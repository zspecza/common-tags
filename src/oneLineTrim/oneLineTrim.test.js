'use strict'

import test from 'ava'
import oneLineTrim from './oneLineTrim'
import {readFromFixture} from '../utils'

const val = 'amaze'

test('reduces to one line while trimming newlines', async (t) => {
  const expected = await readFromFixture(__dirname, 'oneLineTrim')
  const actual = oneLineTrim`
  wow such reduction
  very absence of space
  much ${val}
  `
  t.is(actual, expected)
})

test('reduces to one line while trimming newlines', async (t) => {
  const expected = await readFromFixture(__dirname, 'oneLineTrim')
  const actual = oneLineTrim`
wow such reduction
very absence of space
much ${val}
  `
  t.is(actual, expected)
})
