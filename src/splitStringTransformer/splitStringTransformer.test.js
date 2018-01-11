import TemplateTag from '../TemplateTag';
import inlineArrayTransformer from '../inlineArrayTransformer';
import splitStringTransformer from './splitStringTransformer';

test('splits a string substitution into an array by the specified character', () => {
  const tag = new TemplateTag(
    splitStringTransformer('\n'),
    inlineArrayTransformer,
  );
  expect(tag`foo ${'bar\nbaz'}`).toBe('foo bar baz');
});

test('ignores string if splitBy character is not found', () => {
  const tag = new TemplateTag(splitStringTransformer('.'));
  expect(tag`foo ${'bar,baz'}`).toBe('foo bar,baz');
});

test('ignores substitution if it is not a string', () => {
  const tag = new TemplateTag(splitStringTransformer(''));
  expect(tag`foo ${5}`).toBe('foo 5');
});

test('throws an error if splitBy param is undefined or not a string', () => {
  const tag1 = new TemplateTag(splitStringTransformer);
  const tag2 = new TemplateTag(splitStringTransformer(5));
  expect(() => tag1`foo ${'bar'}`).toThrow();
  expect(() => tag2`foo ${'bar'}`).toThrow();
});
