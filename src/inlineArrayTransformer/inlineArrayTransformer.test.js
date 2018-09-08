import inlineArrayTransformer from './inlineArrayTransformer';
import createTag from '../createTag';

test('only operates on arrays', () => {
  const tag = createTag(inlineArrayTransformer);
  expect(tag`foo ${5} ${'bar'}`).toBe('foo 5 bar');
});

test('includes an array as a comma-separated list', () => {
  const tag = createTag(inlineArrayTransformer({ separator: ',' }));
  expect(tag`I like ${['apple', 'banana', 'kiwi']}`).toBe(
    'I like apple, banana, kiwi',
  );
});

test('replaces last separator with a conjunction', () => {
  const tag = createTag(
    inlineArrayTransformer({ separator: ',', conjunction: 'and' }),
  );
  expect(tag`I like ${['apple', 'banana', 'kiwi']}`).toBe(
    'I like apple, banana and kiwi',
  );
});

test('does not use a conjunction if there is only one item in an array', () => {
  const tag = createTag(
    inlineArrayTransformer({ separator: ',', conjunction: 'and' }),
  );
  expect(tag`I like ${['apple']}`).toBe('I like apple');
});

test('does not require preceded whitespace', () => {
  const tag = createTag(inlineArrayTransformer({ separator: ',' }));
  expect(tag`My friends are (${['bob', 'sally', 'jim']})`).toBe(
    'My friends are (bob, sally, jim)',
  );
});

test('supports serial/oxford separators', () => {
  const tag = createTag(
    inlineArrayTransformer({ separator: ',', conjunction: 'or', serial: true }),
  );
  expect(tag`My friends are always ${['dramatic', 'emotional', 'needy']}`).toBe(
    'My friends are always dramatic, emotional, or needy',
  );
});

test('maintains indentation', () => {
  const tag = createTag(inlineArrayTransformer());
  expect(tag`My friends are always
  ${['dramatic', 'emotional', 'needy']}`).toBe(
    'My friends are always\n  dramatic\n  emotional\n  needy',
  );
});

test('does not introduce excess newlines', () => {
  const tag = createTag(inlineArrayTransformer());
  expect(tag`My friends are always

  ${['dramatic', 'emotional', 'needy']}`).toBe(
    'My friends are always\n\n  dramatic\n  emotional\n  needy',
  );
});
