'use strict'

import test from 'ava'
import inlineArrayTransformer from './inlineArrayTransformer'
import TemplateTag from '../TemplateTag'

test('only operates on arrays', (t) => {
  const tag = new TemplateTag(inlineArrayTransformer)
  t.is(tag`foo ${5} ${'bar'}`, 'foo 5 bar')
})

test('includes an array as a comma-separated list', (t) => {
  const tag = new TemplateTag(inlineArrayTransformer({ separator: ',' }))
  t.is(tag`I like ${['apple', 'banana', 'kiwi']}`, 'I like apple, banana, kiwi')
})

test('replaces last separator with a conjunction', (t) => {
  const tag = new TemplateTag(
    inlineArrayTransformer({ separator: ',', conjunction: 'and' })
  )
  t.is(tag`I like ${['apple', 'banana', 'kiwi']}`, 'I like apple, banana and kiwi')
})

test('does not require preceded whitespace', (t) => {
  const tag = new TemplateTag(
    inlineArrayTransformer({ separator: ',' })
  )
  t.is(tag`My friends are (${['bob', 'sally', 'jim']})`, 'My friends are (bob, sally, jim)')
})
