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

test('common-tags exports all the right modules directly', async (t) => {
  let modules = await node.call(fs.readdir, __dirname)
  modules = mm(modules, observe)
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
  let modules = await node.call(fs.readdir, __dirname)
  modules = mm(modules, observe)
  t.plan(modules.length)
  modules.forEach((module) => {
    t.true(
      typeof require('./index')[module] === 'function',
      `${module} is not exported properly`
    )
  })
})
