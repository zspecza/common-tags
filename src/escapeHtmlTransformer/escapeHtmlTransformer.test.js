'use strict'

import test from 'ava'
import escapeHtmlTransformer from './escapeHtmlTransformer'
import TemplateTag from '../TemplateTag'

test('only operates on substitutions', (t) => {
  const tag = new TemplateTag(escapeHtmlTransformer)
  t.is(tag`<h1>foo${'<bar></bar>'}</h1>`, '<h1>foo&lt;bar&gt;&lt;/bar&gt;</h1>')
})

test('replaces ">" with "&gt;"', (t) => {
  const tag = new TemplateTag(escapeHtmlTransformer)
  t.is(tag`${'>>foo>>bar'}`, '&gt;&gt;foo&gt;&gt;bar')
})

test('replaces "<" with "&lt;"', (t) => {
  const tag = new TemplateTag(escapeHtmlTransformer)
  t.is(tag`${'<<foo<<bar'}`, '&lt;&lt;foo&lt;&lt;bar')
})

test('replaces "&" with "&amp;"', (t) => {
  const tag = new TemplateTag(escapeHtmlTransformer)
  t.is(tag`${'foo&&bar'}`, 'foo&amp;&amp;bar')
})

test('replaces "`" with "&#x60;"', (t) => {
  const tag = new TemplateTag(escapeHtmlTransformer)
  t.is(tag`${'foo``bar'}`, 'foo&#x60;&#x60;bar')
})

test('replaces \'"\' with "&quot;"', (t) => {
  const tag = new TemplateTag(escapeHtmlTransformer)
  t.is(tag`${'foo""bar'}`, 'foo&quot;&quot;bar')
})

test("replaces \"'\" with '&#x27;'", (t) => {
  const tag = new TemplateTag(escapeHtmlTransformer)
  t.is(tag`${"foo''bar"}`, 'foo&#x27;&#x27;bar')
})

test('does not touch undefined and null substitutions', (t) => {
  const tag = new TemplateTag(escapeHtmlTransformer)
  t.is(tag`foo ${undefined} bar ${null}`, 'foo undefined bar null')
})
