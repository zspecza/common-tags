import oneLineInlineLists from './oneLineInlineLists';
import { readFromFixture } from '../testUtils';

const val = 'amaze';

test('includes arrays as inline list on one line', () => {
  const fruits = ['apple', 'banana', 'kiwi'];
  const expected = readFromFixture(__dirname, 'oneLineInlineLists');
  const actual = oneLineInlineLists`
    Doge <3's these fruits: ${fruits}
    they are ${val}
  `;
  expect(actual).toBe(expected);
});
