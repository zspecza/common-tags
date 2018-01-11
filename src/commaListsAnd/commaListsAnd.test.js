import commaListsAnd from './commaListsAnd';
import { readFromFixture } from '../utils';

const val = 'amaze';

test('includes arrays as comma-separated list with "and"', async () => {
  const fruits = ['apple', 'banana', 'kiwi'];
  const expected = await readFromFixture(__dirname, 'commaListsAnd');
  const actual = commaListsAnd`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  expect(actual).toBe(expected);
});

test('only returns the first item of a single element array', async () => {
  const fruits = ['apple'];
  const expected = await readFromFixture(__dirname, 'commaListsAndSingleItem');
  const actual = commaListsAnd`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  expect(actual).toBe(expected);
});
