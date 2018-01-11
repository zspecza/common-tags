import inlineArrayTransformer from './inlineArrayTransformer';
import TemplateTag from '../TemplateTag';

test('only operates on arrays', () => {
  const tag = new TemplateTag(inlineArrayTransformer);
  expect(tag`foo ${5} ${'bar'}`).toBe('foo 5 bar');
});

test('includes an array as a comma-separated list', () => {
  const tag = new TemplateTag(inlineArrayTransformer({ separator: ',' }));
  expect(tag`I like ${['apple', 'banana', 'kiwi']}`).toBe(
    'I like apple, banana, kiwi',
  );
});

test('replaces last separator with a conjunction', () => {
  const tag = new TemplateTag(
    inlineArrayTransformer({ separator: ',', conjunction: 'and' }),
  );
  expect(tag`I like ${['apple', 'banana', 'kiwi']}`).toBe(
    'I like apple, banana and kiwi',
  );
});

test('does not use a conjunction if there is only one item in an array', () => {
  const tag = new TemplateTag(
    inlineArrayTransformer({ separator: ',', conjunction: 'and' }),
  );
  expect(tag`I like ${['apple']}`).toBe('I like apple');
});

test('does not require preceded whitespace', () => {
  const tag = new TemplateTag(inlineArrayTransformer({ separator: ',' }));
  expect(tag`My friends are (${['bob', 'sally', 'jim']})`).toBe(
    'My friends are (bob, sally, jim)',
  );
});

test('supports serial/oxford separators', () => {
  const tag = new TemplateTag(
    inlineArrayTransformer({ separator: ',', conjunction: 'or', serial: true }),
  );
  expect(tag`My friends are always ${['dramatic', 'emotional', 'needy']}`).toBe(
    'My friends are always dramatic, emotional, or needy',
  );
});

test('maintains indentation', () => {
  const tag = new TemplateTag(inlineArrayTransformer());
  expect(tag`My friends are always
  ${['dramatic', 'emotional', 'needy']}`).toBe(
    'My friends are always\n  dramatic\n  emotional\n  needy',
  );
});

test('does not introduce excess newlines', () => {
  const tag = new TemplateTag(inlineArrayTransformer());
  expect(tag`My friends are always

  ${['dramatic', 'emotional', 'needy']}`).toBe(
    'My friends are always\n\n  dramatic\n  emotional\n  needy',
  );
});
