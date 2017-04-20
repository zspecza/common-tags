'use strict'

import test from 'ava'
import replaceLiteralTransformer from './replaceLiteralTransformer'
import TemplateTag from '../TemplateTag'

test('only operates on literals', (t) => {
  const tag = new TemplateTag(
    replaceLiteralTransformer(/</g, '&lt;'),
    replaceLiteralTransformer(/>/g, '&gt;')
  )
  t.is(tag`<h1>foo${'<bar></bar>'}</h1>`, '&lt;h1&gt;foo<bar></bar>&lt;/h1&gt;')
})

test('throws error if no arguments are supplied when used', (t) => {
  const tag = new TemplateTag(replaceLiteralTransformer())
  t.throws(() => tag`${'foo'}`)
})
