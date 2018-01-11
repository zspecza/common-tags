import readFromFixture from './readFromFixture';

test('reads the correct fixture contents', async () => {
  const actual = await readFromFixture(__dirname, 'contents');
  const expected = 'wow such doge';
  expect(actual).toBe(expected);
});

test('should reject if no file was found', async () => {
  await expect(readFromFixture(__dirname, 'nothing')).rejects.toThrow();
});
