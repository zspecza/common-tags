import createTag from '../createTag';
import inlineArrayTransformer from '../inlineArrayTransformer';
import splitStringTransformer from './splitStringTransformer';

test('splits a string substitution into an array by the specified character', () => {
  const tag = createTag(splitStringTransformer('\n'), inlineArrayTransformer());
  expect(tag`foo ${'bar\nbaz'}`).toBe('foo bar baz');
});

test('ignores string if splitBy character is not found', () => {
  const tag = createTag(splitStringTransformer('.'));
  expect(tag`foo ${'bar,baz'}`).toBe('foo bar,baz');
});

test('ignores substitution if it is not a string', () => {
  const tag = createTag(splitStringTransformer(''));
  expect(tag`foo ${5}`).toBe('foo 5');
});

test('throws an error if splitBy param is undefined', () => {
  expect(() => {
    splitStringTransformer();
  }).toThrow(/specify a string character to split by/);
});

test('throws an error if splitBy param is not a string', () => {
  expect(() => {
    splitStringTransformer(42);
  }).toThrow(/specify a string character to split by/);
});
