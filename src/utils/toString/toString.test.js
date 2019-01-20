import toString from './toString';

test('transforms values to string as per spec', () => {
  const get = jest
    .fn()
    .mockImplementationOnce((target, prop) => {
      expect(prop).toBe(Symbol.toPrimitive);
    })
    .mockImplementationOnce((target, prop) => {
      expect(prop).toBe('toString');
    })
    .mockImplementationOnce((target, prop) => {
      expect(prop).toBe('valueOf');
      return () => 42;
    });

  const val = new Proxy({}, { get });
  const result = toString(val);

  expect(get).toHaveBeenCalledTimes(3);
  expect(result).toBe('42');
});
