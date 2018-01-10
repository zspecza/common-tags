import test from 'ava';
import TemplateTag from '../TemplateTag';
import stripIndentTransformer from './stripIndentTransformer';
import trimResultTransformer from '../trimResultTransformer';
import { readFromFixture } from '../utils';

test('default behaviour removes the leading indent, but preserves the rest', async t => {
  const stripIndent = new TemplateTag(stripIndentTransformer, trimResultTransformer);
  const expected = await readFromFixture(__dirname, 'stripIndent');
  const actual = stripIndent`
    foo bar baz
    bar baz foo
      baz foo bar
        wow such doge
  `;
  t.is(actual, expected);
});

test('type "initial" does not remove indents if there is no need to do so', t => {
  const stripIndent = new TemplateTag(stripIndentTransformer, trimResultTransformer);
  t.is(stripIndent``, '');
  t.is(stripIndent`foo`, 'foo');
  t.is(stripIndent`foo\nbar`, 'foo\nbar');
});

test('removes all indents if type is "all"', async t => {
  const stripIndents = new TemplateTag(stripIndentTransformer('all'), trimResultTransformer);
  const expected = await readFromFixture(__dirname, 'stripIndents');
  const actual = stripIndents`
    foo bar baz
    bar baz foo
      baz foo bar
        wow such doge
  `;
  t.is(actual, expected);
});

test('throws an error if encounters invalid type', t => {
  const stripBlueIndents = new TemplateTag(stripIndentTransformer('blue'));
  t.throws(() => stripBlueIndents`foo`);
});
