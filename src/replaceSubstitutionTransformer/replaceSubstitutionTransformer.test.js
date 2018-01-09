import test from 'ava'
import replaceSubstitutionTransformer from './replaceSubstitutionTransformer'
import TemplateTag from '../TemplateTag'

test('only operates on substitutions', t => {
  const tag = new TemplateTag(
    replaceSubstitutionTransformer(/</g, '&lt;'),
    replaceSubstitutionTransformer(/>/g, '&gt;'),
  )
  t.is(tag`<h1>foo${'<bar></bar>'}</h1>`, '<h1>foo&lt;bar&gt;&lt;/bar&gt;</h1>')
})

test('does not touch undefined and null substitutions', t => {
  const tag = new TemplateTag(replaceSubstitutionTransformer(/u/g, ''))
  t.is(tag`foo ${undefined} bar ${null}`, 'foo undefined bar null')
})

test('works on numbers', t => {
  const tag = new TemplateTag(replaceSubstitutionTransformer(/2/g, '3'))
  t.is(tag`foo ${2} bar ${43.12}`, 'foo 3 bar 43.13')
})

test('works on arrays', t => {
  const tag = new TemplateTag(replaceSubstitutionTransformer(/foo/g, 'bar'))
  t.is(tag`${['foo', 'bar', 'foo']}`, 'bar,bar,bar')
})

test('throws error if no arguments are supplied when used', t => {
  const tag = new TemplateTag(replaceSubstitutionTransformer())
  t.throws(() => tag`${'foo'}`)
})
