import TemplateTag from '../TemplateTag';
import stripIndentTransformer from './stripIndentTransformer';
import trimResultTransformer from '../trimResultTransformer';
import { readFromFixture } from '../utils';

test('default behaviour removes the leading indent, but preserves the rest', async () => {
  const stripIndent = new TemplateTag(
    stripIndentTransformer,
    trimResultTransformer,
  );
  const expected = await readFromFixture(__dirname, 'stripIndent');
  const actual = stripIndent`
    foo bar baz
    bar baz foo
      baz foo bar
        wow such doge
  `;
  expect(actual).toBe(expected);
});

test('type "initial" does not remove indents if there is no need to do so', () => {
  const stripIndent = new TemplateTag(
    stripIndentTransformer,
    trimResultTransformer,
  );
  expect(stripIndent``).toBe('');
  expect(stripIndent`foo`).toBe('foo');
  expect(stripIndent`foo\nbar`).toBe('foo\nbar');
});

test('removes all indents if type is "all"', async () => {
  const stripIndents = new TemplateTag(
    stripIndentTransformer('all'),
    trimResultTransformer,
  );
  const expected = await readFromFixture(__dirname, 'stripIndents');
  const actual = stripIndents`
    foo bar baz
    bar baz foo
      baz foo bar
        wow such doge
  `;
  expect(actual).toBe(expected);
});

test('throws an error if encounters invalid type', () => {
  const stripBlueIndents = new TemplateTag(stripIndentTransformer('blue'));
  expect(() => stripBlueIndents`foo`).toThrow();
});
