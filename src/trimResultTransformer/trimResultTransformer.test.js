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

describe('smart trimming', () => {
  const trimSmart = createTag(trimResultTransformer('smart'));

  test('leaves a string without surrounding whitespace as-is', () => {
    expect(trimSmart`a`).toBe('a');
  });

  test('performs an end-side trim on a single-line string', () => {
    expect(trimSmart`  a  `).toBe('  a');
  });

  test('trims whitespace at the end of each line', () => {
    expect(trimSmart`a  \n  b  \nc  `).toBe('a\n  b\nc');
  });

  test("removes the first line if it's empty", () => {
    expect(trimSmart`  \na`).toBe('a');
  });

  test('leaves the trailing newline character', () => {
    expect(trimSmart`a  \n`).toBe('a\n');
  });

  test("doesn't remove intentional newline characters", () => {
    expect(trimSmart`a\n  \n`).toBe('a\n\n');
  });
});

test('throws an error if invalid side supplied', () => {
  expect(() => {
    trimResultTransformer('up');
  }).toThrow(/not supported/);
});
