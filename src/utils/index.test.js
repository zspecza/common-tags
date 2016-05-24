'use strict'

import fs from 'fs'
import path from 'path'
import test from 'ava'
import mm from 'micromatch'
import node from 'when/node'

const observe = [
  '*',
  '!index.js',
  '!index.test.js'
]

test.beforeEach(async (t) => {
  t.context.modules = mm(await node.call(fs.readdir, __dirname), observe)
})

test('utils exports all the right modules directly', async (t) => {
  const modules = t.context.modules
  t.plan(modules.length)
  modules.forEach((module) => {
    const _path = path.join(__dirname, module)
    t.true(require(_path) != null, `${module} is not exported properly`)
  })
})

test('utils exports all the right modules as props', async (t) => {
  const modules = t.context.modules
  t.plan(modules.length)
  modules.forEach((module) => {
    t.true(require('./index')[module] != null, `${module} is not exported properly`)
  })
})
