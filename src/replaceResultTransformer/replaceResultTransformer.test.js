'use strict'

import test from 'ava'
import TemplateTag from '../TemplateTag'
import replaceResultTransformer from './replaceResultTransformer'
import trimResultTransformer from '../trimResultTransformer'

test('replaces sequential whitespace with a single space', (t) => {
  const oneLine = new TemplateTag(
    replaceResultTransformer(/(?:\s+)/g, ' '),
    trimResultTransformer
  )
  const expected = 'foo bar baz'
  const actual = oneLine`
    foo
    bar
    baz
  `
  t.is(actual, expected)
})

test('can be set so sequence requires a newline at the beginning before triggering replacement', (t) => {
  const oneLineTrim = new TemplateTag(
    replaceResultTransformer(/(?:\n\s+)/g, ''),
    trimResultTransformer
  )
  const expected = 'https://google.com?utm_source=common-tags'
  const actual = oneLineTrim`
    https://
    google.com
    ?utm_source=common-tags
  `
  t.is(actual, expected)
})

test('throws error if no arguments are supplied', (t) => {
  const tag = new TemplateTag(replaceResultTransformer)
  t.throws(() => tag`foo`)
})
