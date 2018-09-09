import oneLineCommaListsAnd from './oneLineCommaListsAnd';
import { readFromFixture } from '../testUtils';

const val = 'amaze';

test('includes arrays as comma-separated list on one line with "and"', () => {
  const fruits = ['apple', 'banana', 'kiwi'];
  const expected = readFromFixture(__dirname, 'oneLineCommaListsAnd').trim();
  const actual = oneLineCommaListsAnd`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  expect(actual).toBe(expected);
});

test('only returns the first item of a single element array', () => {
  const fruits = ['apple'];
  const expected = readFromFixture(
    __dirname,
    'oneLineCommaListsAndSingleItem',
  ).trim();
  const actual = oneLineCommaListsAnd`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  expect(actual).toBe(expected);
});
