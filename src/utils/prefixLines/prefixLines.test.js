import prefixLines from './prefixLines';

test('it should prefix lines with a given string', () => {
  const actual = prefixLines('foo', '  a  \n  b  \n  c  ');
  const expected = 'foo  a  \nfoo  b  \nfoo  c  ';

  expect(actual).toEqual(expected);
});

test('it should prefix lines with a given non-string value', () => {
  const actual = prefixLines(42, '  a  \n  b  \n  c  ');
  const expected = '42  a  \n42  b  \n42  c  ';

  expect(actual).toEqual(expected);
});

test('it should skip the first line with the option set', () => {
  const actual = prefixLines('foo', '  a  \n  b  \n  c  ', true);
  const expected = '  a  \nfoo  b  \nfoo  c  ';

  expect(actual).toEqual(expected);
});
