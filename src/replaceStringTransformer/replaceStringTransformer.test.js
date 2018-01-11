import replaceStringTransformer from './replaceStringTransformer';
import TemplateTag from '../TemplateTag';

test('only operates on strings', () => {
  const tag = new TemplateTag(
    replaceStringTransformer(/</g, '&lt;'),
    replaceStringTransformer(/>/g, '&gt;'),
  );
  expect(tag`<h1>foo${'<bar></bar>'}</h1>`).toBe(
    '&lt;h1&gt;foo<bar></bar>&lt;/h1&gt;',
  );
});

test('throws error if no arguments are supplied when used', () => {
  const tag = new TemplateTag(replaceStringTransformer());
  expect(() => tag`${'foo'}`).toThrow();
});
