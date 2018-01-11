import oneLineCommaLists from './oneLineCommaLists';
import { readFromFixture } from '../utils';

const val = 'amaze';

test('includes arrays as comma-separated list on one line', async () => {
  const fruits = ['apple', 'banana', 'kiwi'];
  const expected = await readFromFixture(__dirname, 'oneLineCommaLists');
  const actual = oneLineCommaLists`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  expect(actual).toBe(expected);
});
