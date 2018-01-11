import TemplateTag from '../TemplateTag';
import stripIndentTransformer from '../stripIndentTransformer';
import trimResultTransformer from './trimResultTransformer';

test('trims outer padding', () => {
  const trim = new TemplateTag(trimResultTransformer);
  expect(trim`  foo  `).toBe('foo');
});

test('trims start padding', () => {
  const trimStart = new TemplateTag(trimResultTransformer('start'));
  expect(trimStart`  foo  `).toBe('foo  ');
});

test('trims left padding', () => {
  const trimLeft = new TemplateTag(trimResultTransformer('left'));
  expect(trimLeft`  foo  `).toBe('foo  ');
});

test('trims end padding', () => {
  const trimEnd = new TemplateTag(trimResultTransformer('end'));
  expect(trimEnd`  foo  `).toBe('  foo');
});

test('trims right padding', () => {
  const trimRight = new TemplateTag(trimResultTransformer('right'));
  expect(trimRight`  foo  `).toBe('  foo');
});

test('throws an error if invalid side supplied', () => {
  const trimUp = new TemplateTag(trimResultTransformer('up'));
  expect(() => trimUp`foo`).toThrow();
});

test('can be used sequentially', () => {
  const trimStart = new TemplateTag(
    stripIndentTransformer,
    trimResultTransformer('start'),
  );
  expect(trimStart`  foo  `).toBe('foo  ');
  expect(trimStart`  bar  `).toBe('bar  ');
});
