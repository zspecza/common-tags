'use strict'

import fs from 'fs'
import test from 'ava'
import node from 'when/node'
import stripIndent from './stripIndent'

const val = 'amaze'

async function fixture (name) {
  const txt = await node.call(
    fs.readFile,
    `./fixtures/${name}.txt`,
    'utf8'
  )
  return txt.trim()
}

test('strips indentation', async (t) => {
  const expected = await fixture('stripIndent')
  const actual = stripIndent`
    wow such indent gone
    very ${val}
  `
  t.is(actual, expected)
})

test('strips larger indentation', async (t) => {
  const expected = await fixture('stripIndent')
  const actual = stripIndent`
      wow such indent gone
      very ${val}
  `
  t.is(actual, expected)
})

test('maintains deeper indentation', async (t) => {
  const expected = await fixture('maintainIndent')
  const actual = stripIndent`
    wow such indent gone
        very ${val}
  `
  t.is(actual, expected)
})

test('does nothing if there are no indents', async (t) => {
  const expected = 'wow such doge'
  const actual = stripIndent`wow such doge`
  t.is(actual, expected)
})
