'use strict'

import test from 'ava'
import {
  readFromFixture,
  depracation
} from './'

test('exports all the right modules', (t) => {
  const exports = [
    readFromFixture,
    depracation
  ]

  t.plan(exports.length)

  exports.forEach((module) => {
    t.true(typeof module === 'function')
  })
})
