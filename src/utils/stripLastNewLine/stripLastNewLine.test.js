import stripLastNewLine from './stripLastNewLine';

test('it should strip last new line with a given string', () => {
  const actual = stripLastNewLine('foo\n');
  const expected = 'foo';

  expect(actual).toEqual(expected);
});

test('it should leave a string as is when the last character is not a new line', () => {
  const actual = stripLastNewLine('foo');
  const expected = 'foo';

  expect(actual).toEqual(expected);
});

test('it should return an empty string for an empty string', () => {
  const actual = stripLastNewLine('');
  const expected = '';

  expect(actual).toEqual(expected);
});
