import id from './id';

test('returns whatever comes at it', () => {
  expect(id`foo${42}bar`).toBe('foo42bar');
});

test('returns whatever comes at it (number version)', () => {
  expect(id(42)).toBe(42);
});
