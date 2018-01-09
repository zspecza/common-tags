import test from 'ava'
import TemplateTag from '../TemplateTag'
import inlineArrayTransformer from '../inlineArrayTransformer'
import splitStringTransformer from './splitStringTransformer'

test('splits a string substitution into an array by the specified character', t => {
  const tag = new TemplateTag(splitStringTransformer('\n'), inlineArrayTransformer)
  t.is(tag`foo ${'bar\nbaz'}`, 'foo bar baz')
})

test('ignores string if splitBy character is not found', t => {
  const tag = new TemplateTag(splitStringTransformer('.'))
  t.is(tag`foo ${'bar,baz'}`, 'foo bar,baz')
})

test('ignores substitution if it is not a string', t => {
  const tag = new TemplateTag(splitStringTransformer(''))
  t.is(tag`foo ${5}`, 'foo 5')
})

test('throws an error if splitBy param is undefined or not a string', t => {
  const tag1 = new TemplateTag(splitStringTransformer)
  const tag2 = new TemplateTag(splitStringTransformer(5))
  t.throws(() => tag1`foo ${'bar'}`)
  t.throws(() => tag2`foo ${'bar'}`)
})
