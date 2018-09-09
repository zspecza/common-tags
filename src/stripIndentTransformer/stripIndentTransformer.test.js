import createTag from '../createTag';
import stripIndentTransformer from './stripIndentTransformer';
import trimResultTransformer from '../trimResultTransformer';
import { readFromFixture } from '../testUtils';

test('default behaviour removes the leading indent, but preserves the rest', () => {
  const stripIndent = createTag(
    stripIndentTransformer(),
    trimResultTransformer(),
  );
  const expected = readFromFixture(__dirname, 'stripIndent');
  const actual = stripIndent`
    foo bar baz
    bar baz foo
      baz foo bar
        wow such doge
  `;
  expect(actual).toBe(expected);
});

test('type "initial" does not remove indents if there is no need to do so', () => {
  const stripIndent = createTag(
    stripIndentTransformer(),
    trimResultTransformer(),
  );
  expect(stripIndent``).toBe('');
  expect(stripIndent`foo`).toBe('foo');
  expect(stripIndent`foo\nbar`).toBe('foo\nbar');
});

test('removes all indents if type is "all"', () => {
  const stripIndents = createTag(
    stripIndentTransformer('all'),
    trimResultTransformer(),
  );
  const expected = readFromFixture(__dirname, 'stripIndents');
  const actual = stripIndents`
    foo bar baz
    bar baz foo
      baz foo bar
        wow such doge
  `;
  expect(actual).toBe(expected);
});

test('throws an error if encounters invalid type', () => {
  expect(() => {
    stripIndentTransformer('blue');
  }).toThrow(/not supported/);
});
