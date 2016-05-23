'use strict'

import fs from 'fs'
import path from 'path'
import test from 'ava'
import mm from 'micromatch'
import node from 'when/node'

const observe = [
  '*',
  '!utils',
  '!index.js',
  '!index.test.js'
]

test.beforeEach(async (t) => {
  t.context.modules = mm(await node.call(fs.readdir, __dirname), observe)
})

test('common-tags exports all the right modules directly', async (t) => {
  const modules = t.context.modules
  t.plan(modules.length)
  modules.forEach((module) => {
    const _path = path.join(__dirname, module)
    t.true(
      typeof require(_path).default === 'function',
      `${module} is not exported properly`
    )
  })
})

test('common-tags exports all the right modules as props', async (t) => {
  const modules = t.context.modules
  t.plan(modules.length)
  modules.forEach((module) => {
    t.true(
      typeof require('./index')[module] === 'function',
      `${module} is not exported properly`
    )
  })
})
