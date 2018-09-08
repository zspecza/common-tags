import flat from './flat';

test('leaves flat array as-is', () => {
  expect(flat([1, 2, 3])).toEqual([1, 2, 3]);
});

test('flattens array elements', () => {
  expect(flat([[1], [2, 3]])).toEqual([1, 2, 3]);
});

test('handles mixed content', () => {
  expect(flat([1, [2, 3]])).toEqual([1, 2, 3]);
});

test("doesn't flatten more than 1 level", () => {
  expect(flat([1, [2, [3]]])).toEqual([1, 2, [3]]);
});
