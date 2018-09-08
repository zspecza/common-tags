import oneLineCommaListsOr from './oneLineCommaListsOr';
import { readFromFixture } from '../testUtils';

const val = 'amaze';

test('includes arrays as comma-separated list on one line with "or"', () => {
  const fruits = ['apple', 'banana', 'kiwi'];
  const expected = readFromFixture(__dirname, 'oneLineCommaListsOr');
  const actual = oneLineCommaListsOr`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  expect(actual).toBe(expected);
});

test('only returns the first item of a single element array', () => {
  const fruits = ['apple'];
  const expected = readFromFixture(__dirname, 'oneLineCommaListsOrSingleItem');
  const actual = oneLineCommaListsOr`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  expect(actual).toBe(expected);
});
