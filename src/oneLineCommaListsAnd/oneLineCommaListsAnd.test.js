import oneLineCommaListsAnd from './oneLineCommaListsAnd';
import { readFromFixture } from '../utils';

const val = 'amaze';

test('includes arrays as comma-separated list on one line with "and"', async () => {
  const fruits = ['apple', 'banana', 'kiwi'];
  const expected = await readFromFixture(__dirname, 'oneLineCommaListsAnd');
  const actual = oneLineCommaListsAnd`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  expect(actual).toBe(expected);
});

test('only returns the first item of a single element array', async () => {
  const fruits = ['apple'];
  const expected = await readFromFixture(
    __dirname,
    'oneLineCommaListsAndSingleItem',
  );
  const actual = oneLineCommaListsAnd`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  expect(actual).toBe(expected);
});
