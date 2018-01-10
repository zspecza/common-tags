import test from 'ava';
import replaceStringTransformer from './replaceStringTransformer';
import TemplateTag from '../TemplateTag';

test('only operates on strings', t => {
  const tag = new TemplateTag(
    replaceStringTransformer(/</g, '&lt;'),
    replaceStringTransformer(/>/g, '&gt;'),
  );
  t.is(
    tag`<h1>foo${'<bar></bar>'}</h1>`,
    '&lt;h1&gt;foo<bar></bar>&lt;/h1&gt;',
  );
});

test('throws error if no arguments are supplied when used', t => {
  const tag = new TemplateTag(replaceStringTransformer());
  t.throws(() => tag`${'foo'}`);
});
