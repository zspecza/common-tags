import commaLists from './commaLists';
import { readFromFixture } from '../testUtils';

const val = 'amaze';

test('includes arrays as comma-separated list', () => {
  const fruits = ['apple', 'banana', 'kiwi'];
  const expected = readFromFixture(__dirname, 'commaLists');
  const actual = commaLists`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  expect(actual).toBe(expected);
});
