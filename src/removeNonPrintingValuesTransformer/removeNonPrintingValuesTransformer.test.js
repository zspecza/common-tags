import test from 'ava';
import TemplateTag from '../TemplateTag';
import inlineArrayTransformer from '../inlineArrayTransformer';
import removeNonPrintingValuesTransformer from '../removeNonPrintingValuesTransformer';

test('removes null', t => {
  const remove = new TemplateTag(removeNonPrintingValuesTransformer);
  const nil = null;
  t.is(remove`a${nil}z`, 'az');
});

test('removes bool', t => {
  const remove = new TemplateTag(removeNonPrintingValuesTransformer);
  const yep = true;
  const nope = false;
  t.is(remove`a${yep}${nope}z`, 'az');
});

test('removes NaN', t => {
  const remove = new TemplateTag(removeNonPrintingValuesTransformer);
  const nan = 0 / 0;
  t.is(remove`a${nan}z`, 'az');
});

test('removes non-printing array values', t => {
  const remove = new TemplateTag(removeNonPrintingValuesTransformer, inlineArrayTransformer);
  const val = ['foo', undefined, 'bar', null];
  t.is(remove`a ${val} z`, 'a foo bar z');
});
