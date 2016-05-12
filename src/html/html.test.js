'use strict'

import fs from 'fs'
import test from 'ava'
import node from 'when/node'
import html from './html'

const val = 'amaze'

async function fixture (name) {
  const txt = await node.call(
    fs.readFile,
    `./fixtures/${name}.txt`,
    'utf8'
  )
  return txt.trim()
}

test('renders HTML, including arrays', async (t) => {
  const fruits = ['apple', 'banana', 'kiwi']
  const expected = await fixture('html')
  const actual = html`
    <h1>${val}</h1>
    <ul>
      ${fruits.map((fruit) => `<li>${fruit}</li>`)}
    </ul>
  `
  t.is(actual, expected)
})
