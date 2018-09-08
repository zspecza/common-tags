import oneLineCommaLists from './oneLineCommaLists';
import { readFromFixture } from '../testUtils';

const val = 'amaze';

test('includes arrays as comma-separated list on one line', () => {
  const fruits = ['apple', 'banana', 'kiwi'];
  const expected = readFromFixture(__dirname, 'oneLineCommaLists');
  const actual = oneLineCommaLists`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  expect(actual).toBe(expected);
});
