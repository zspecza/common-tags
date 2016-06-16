'use strict'

import test from 'ava'
import TemplateTag from '../TemplateTag'
import stripIndentTransformer from '../stripIndentTransformer'
import trimResultTransformer from './trimResultTransformer'

test('trims outer padding', (t) => {
  const trim = new TemplateTag(trimResultTransformer)
  t.is(trim`  foo  `, 'foo')
})

test('trims left padding', (t) => {
  const trimLeft = new TemplateTag(trimResultTransformer('left'))
  t.is(trimLeft`  foo  `, 'foo  ')
})

test('trims right padding', (t) => {
  const trimRight = new TemplateTag(trimResultTransformer('right'))
  t.is(trimRight`  foo  `, '  foo')
})

test('throws an error if invalid side supplied', (t) => {
  const trimUp = new TemplateTag(trimResultTransformer('up'))
  t.throws(() => trimUp`foo`)
})

test('can be used sequentially', (t) => {
  const trimLeft = new TemplateTag(stripIndentTransformer, trimResultTransformer('left'))
  t.is(trimLeft`  foo  `, 'foo  ')
  t.is(trimLeft`  bar  `, 'bar  ')
})
