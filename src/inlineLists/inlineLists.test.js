'use strict'

import fs from 'fs'
import test from 'ava'
import node from 'when/node'
import inlineLists from './inlineLists'

const val = 'amaze'

async function fixture (name) {
  const txt = await node.call(
    fs.readFile,
    `./fixtures/${name}.txt`,
    'utf8'
  )
  return txt.trim()
}

test('includes arrays as space-separated list', async (t) => {
  const fruits = ['apple', 'banana', 'kiwi']
  const expected = await fixture('inlineLists')
  const actual = inlineLists`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `
  t.is(actual, expected)
})
