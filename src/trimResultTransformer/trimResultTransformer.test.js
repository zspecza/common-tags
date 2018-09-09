import createTag from '../createTag';
import stripIndentTransformer from '../stripIndentTransformer';
import trimResultTransformer from './trimResultTransformer';

test('trims outer padding', () => {
  const trim = createTag(trimResultTransformer());
  expect(trim`  foo  `).toBe('foo');
});

test('trims start padding', () => {
  const trimStart = createTag(trimResultTransformer('start'));
  expect(trimStart`  foo  `).toBe('foo  ');
});

test('trims left padding', () => {
  const trimLeft = createTag(trimResultTransformer('left'));
  expect(trimLeft`  foo  `).toBe('foo  ');
});

test('trims end padding', () => {
  const trimEnd = createTag(trimResultTransformer('end'));
  expect(trimEnd`  foo  `).toBe('  foo');
});

test('trims right padding', () => {
  const trimRight = createTag(trimResultTransformer('right'));
  expect(trimRight`  foo  `).toBe('  foo');
});

test('can be used sequentially', () => {
  const trimStart = createTag(
    stripIndentTransformer(),
    trimResultTransformer('start'),
  );
  expect(trimStart`  foo  `).toBe('foo  ');
  expect(trimStart`  bar  `).toBe('bar  ');
});

test('throws an error if invalid side supplied', () => {
  expect(() => {
    trimResultTransformer('up');
  }).toThrow(/not supported/);
});
