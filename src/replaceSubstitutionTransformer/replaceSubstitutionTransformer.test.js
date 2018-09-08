import replaceSubstitutionTransformer from './replaceSubstitutionTransformer';
import createTag from '../createTag';

test('only operates on substitutions', () => {
  const tag = createTag(
    replaceSubstitutionTransformer(/</g, '&lt;'),
    replaceSubstitutionTransformer(/>/g, '&gt;'),
  );
  expect(tag`<h1>foo${'<bar></bar>'}</h1>`).toBe(
    '<h1>foo&lt;bar&gt;&lt;/bar&gt;</h1>',
  );
});

test('does not touch undefined and null substitutions', () => {
  const tag = createTag(replaceSubstitutionTransformer(/u/g, ''));
  expect(tag`foo ${undefined} bar ${null}`).toBe('foo undefined bar null');
});

test('works on numbers', () => {
  const tag = createTag(replaceSubstitutionTransformer(/2/g, '3'));
  expect(tag`foo ${2} bar ${43.12}`).toBe('foo 3 bar 43.13');
});

test('works on arrays', () => {
  const tag = createTag(replaceSubstitutionTransformer(/foo/g, 'bar'));
  expect(tag`${['foo', 'bar', 'foo']}`).toBe('bar,bar,bar');
});

test('throws error if no arguments are supplied when used', () => {
  const tag = createTag(replaceSubstitutionTransformer());
  expect(() => tag`${'foo'}`).toThrow();
});
