'use strict'

import test from 'ava'
import readFromFixture from './readFromFixture'

test('reads the correct fixture contents', async (t) => {
  const actual = await readFromFixture('contents')
  const expected = 'wow such doge'
  t.is(actual, expected)
})

test('should reject if no file was found', (t) => {
  t.throws(readFromFixture('nothing'))
})
