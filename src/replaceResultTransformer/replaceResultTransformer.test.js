import createTag from '../createTag';
import replaceResultTransformer from './replaceResultTransformer';
import trimResultTransformer from '../trimResultTransformer';

test('replaces sequential whitespace with a single space', () => {
  const oneLine = createTag(
    replaceResultTransformer(/(?:\s+)/g, ' '),
    trimResultTransformer(),
  );
  const expected = 'foo bar baz';
  const actual = oneLine`
    foo
    bar
    baz
  `;
  expect(actual).toBe(expected);
});

test('can be set so sequence requires a newline at the beginning before triggering replacement', () => {
  const oneLineTrim = createTag(
    replaceResultTransformer(/(?:\n\s+)/g, ''),
    trimResultTransformer(),
  );
  const expected = 'https://google.com?utm_source=common-tags';
  const actual = oneLineTrim`
    https://
    google.com
    ?utm_source=common-tags
  `;
  expect(actual).toBe(expected);
});

test('throws error if no arguments are supplied', () => {
  const tag = createTag(replaceResultTransformer());
  expect(() => tag`foo`).toThrow();
});
