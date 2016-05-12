'use strict'

import fs from 'fs'
import test from 'ava'
import node from 'when/node'
import oneLine from './oneLine'

const val = 'amaze'

async function fixture (name) {
  const txt = await node.call(
    fs.readFile,
    `./fixtures/${name}.txt`,
    'utf8'
  )
  return txt.trim()
}

test('reduces text to one line, replacing newlines with spaces', async (t) => {
  const expected = await fixture('oneLine')
  const actual = oneLine`
    wow such doge
    is very ${val}
    at one line neat
    from multiline
  `
  t.is(actual, expected)
})
