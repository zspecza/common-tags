'use strict'

import fs from 'fs'
import test from 'ava'
import node from 'when/node'
import oneLineTrim from './oneLineTrim'

const val = 'amaze'

async function fixture (name) {
  const txt = await node.call(
    fs.readFile,
    `./fixtures/${name}.txt`,
    'utf8'
  )
  return txt.trim()
}

test('reduces to one line while trimming newlines', async (t) => {
  const expected = await fixture('oneLineTrim')
  const actual = oneLineTrim`
  wow such reduction
  very absence of space
  much ${val}
  `
  t.is(actual, expected)
})
