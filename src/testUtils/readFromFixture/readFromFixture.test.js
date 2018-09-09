import readFromFixture from './readFromFixture';

test('reads the correct fixture contents', () => {
  const actual = readFromFixture(__dirname, 'contents');
  const expected = 'wow such doge\n';
  expect(actual).toBe(expected);
});

test('should throw if no file was found', () => {
  expect(() => {
    readFromFixture(__dirname, 'nothing');
  }).toThrow(/ENOENT/);
});
