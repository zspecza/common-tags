import test from 'ava'
import TemplateTag from '../TemplateTag'
import stripIndentTransformer from '../stripIndentTransformer'
import trimResultTransformer from './trimResultTransformer'

test('trims outer padding', t => {
  const trim = new TemplateTag(trimResultTransformer)
  t.is(trim`  foo  `, 'foo')
})

test('trims start padding', t => {
  const trimStart = new TemplateTag(trimResultTransformer('start'))
  t.is(trimStart`  foo  `, 'foo  ')
})

test('trims left padding', t => {
  const trimLeft = new TemplateTag(trimResultTransformer('left'))
  t.is(trimLeft`  foo  `, 'foo  ')
})

test('trims end padding', t => {
  const trimEnd = new TemplateTag(trimResultTransformer('end'))
  t.is(trimEnd`  foo  `, '  foo')
})

test('trims right padding', t => {
  const trimRight = new TemplateTag(trimResultTransformer('right'))
  t.is(trimRight`  foo  `, '  foo')
})

test('throws an error if invalid side supplied', t => {
  const trimUp = new TemplateTag(trimResultTransformer('up'))
  t.throws(() => trimUp`foo`)
})

test('can be used sequentially', t => {
  const trimStart = new TemplateTag(stripIndentTransformer, trimResultTransformer('start'))
  t.is(trimStart`  foo  `, 'foo  ')
  t.is(trimStart`  bar  `, 'bar  ')
})
