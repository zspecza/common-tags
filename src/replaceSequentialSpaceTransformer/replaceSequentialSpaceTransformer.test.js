'use strict'

import test from 'ava'
import TemplateTag from '../TemplateTag'
import replaceSequentialSpaceTransformer from './replaceSequentialSpaceTransformer'
import trimResultTransformer from '../trimResultTransformer'

test('replaces sequential whitespace with a single space', (t) => {
  const oneLine = new TemplateTag(
    replaceSequentialSpaceTransformer,
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

test('replaces sequential whitespace with a single space', (t) => {
  const oneLineTrim = new TemplateTag(
    replaceSequentialSpaceTransformer(''),
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
