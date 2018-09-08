import createTag from '../createTag';
import inlineArrayTransformer from '../inlineArrayTransformer';
import removeNonPrintingValuesTransformer from '../removeNonPrintingValuesTransformer';

test('removes null', () => {
  const remove = createTag(removeNonPrintingValuesTransformer());
  const nil = null;
  expect(remove`a${nil}z`).toBe('az');
});

test('removes bool', () => {
  const remove = createTag(removeNonPrintingValuesTransformer());
  const yep = true;
  const nope = false;
  expect(remove`a${yep}${nope}z`).toBe('az');
});

test('removes NaN', () => {
  const remove = createTag(removeNonPrintingValuesTransformer());
  const nan = 0 / 0;
  expect(remove`a${nan}z`).toBe('az');
});

test('removes non-printing array values', () => {
  const remove = createTag(
    removeNonPrintingValuesTransformer(),
    inlineArrayTransformer(),
  );
  const val = ['foo', undefined, 'bar', null];
  expect(remove`a ${val} z`).toBe('a foo bar z');
});
