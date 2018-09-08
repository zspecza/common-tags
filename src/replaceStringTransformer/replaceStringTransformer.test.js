import replaceStringTransformer from './replaceStringTransformer';
import createTag from '../createTag';

test('only operates on strings', () => {
  const tag = createTag(
    replaceStringTransformer(/</g, '&lt;'),
    replaceStringTransformer(/>/g, '&gt;'),
  );
  expect(tag`<h1>foo${'<bar></bar>'}</h1>`).toBe(
    '&lt;h1&gt;foo<bar></bar>&lt;/h1&gt;',
  );
});

test('throws error if no arguments are supplied when used', () => {
  const tag = createTag(replaceStringTransformer());
  expect(() => tag`${'foo'}`).toThrow();
});
