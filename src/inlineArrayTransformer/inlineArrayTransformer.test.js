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

test('does not use a conjunction if there is only one item in an array', (t) => {
  const tag = new TemplateTag(
    inlineArrayTransformer({ separator: ',', conjunction: 'and' })
  )
  t.is(tag`I like ${['apple']}`, 'I like apple')
})

test('does not require preceded whitespace', (t) => {
  const tag = new TemplateTag(
    inlineArrayTransformer({ separator: ',' })
  )
  t.is(tag`My friends are (${['bob', 'sally', 'jim']})`, 'My friends are (bob, sally, jim)')
})

test('supports serial/oxford separators', (t) => {
  const tag = new TemplateTag(
    inlineArrayTransformer({ separator: ',', conjunction: 'or', serial: true })
  )
  t.is(tag`My friends are always ${['dramatic', 'emotional', 'needy']}`, 'My friends are always dramatic, emotional, or needy')
})

test('maintains indentation', (t) => {
  const tag = new TemplateTag(
    inlineArrayTransformer()
  )
  t.is(tag`My friends are always
  ${['dramatic', 'emotional', 'needy']}`,
       'My friends are always\n  dramatic\n  emotional\n  needy')
})

test('does not introduce excess newlines', (t) => {
  const tag = new TemplateTag(
    inlineArrayTransformer()
  )
  t.is(tag`My friends are always

  ${['dramatic', 'emotional', 'needy']}`,
       'My friends are always\n\n  dramatic\n  emotional\n  needy')
})
