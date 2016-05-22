'use strict'

import test from 'ava'
import {
  readFromFixture
} from './'

test('exports all the right modules', (t) => {
  const exports = [
    readFromFixture
  ]

  t.plan(exports.length)

  exports.forEach((module) => {
    t.true(typeof module === 'function')
  })
})
