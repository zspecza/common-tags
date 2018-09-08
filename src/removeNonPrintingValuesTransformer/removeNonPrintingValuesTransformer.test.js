import TemplateTag from '../TemplateTag';
import inlineArrayTransformer from '../inlineArrayTransformer';
import removeNonPrintingValuesTransformer from '../removeNonPrintingValuesTransformer';

test('removes null', () => {
  const remove = new TemplateTag(removeNonPrintingValuesTransformer());
  const nil = null;
  expect(remove`a${nil}z`).toBe('az');
});

test('removes bool', () => {
  const remove = new TemplateTag(removeNonPrintingValuesTransformer());
  const yep = true;
  const nope = false;
  expect(remove`a${yep}${nope}z`).toBe('az');
});

test('removes NaN', () => {
  const remove = new TemplateTag(removeNonPrintingValuesTransformer());
  const nan = 0 / 0;
  expect(remove`a${nan}z`).toBe('az');
});

test('removes non-printing array values', () => {
  const remove = new TemplateTag(
    removeNonPrintingValuesTransformer(),
    inlineArrayTransformer(),
  );
  const val = ['foo', undefined, 'bar', null];
  expect(remove`a ${val} z`).toBe('a foo bar z');
});
