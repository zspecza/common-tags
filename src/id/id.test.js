import id from './id';

test('returns whatever comes at it', async () => {
  expect(id`foo${42}bar`).toBe('foo42bar');
});

test('returns whatever comes at it (number version)', async () => {
  expect(id(42)).toBe(42);
});
