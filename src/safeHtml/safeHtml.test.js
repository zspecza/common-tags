import safeHtml from './safeHtml';
import { readFromFixture } from '../utils';

const val = 'amaze';

test('renders HTML, including arrays', async () => {
  const fruits = ['apple', 'banana', 'kiwi'];
  const expected = await readFromFixture(__dirname, 'normal-html');
  const actual = safeHtml`
    <h1>${val}</h1>
    <ul>
      ${fruits.map(fruit => `${fruit}`)}
    </ul>
  `;
  expect(actual).toBe(expected);
});

test('converts strings containing newlines into proper indented output', async () => {
  const newlines = 'one\ntwo';
  const expected = await readFromFixture(__dirname, 'newline-conversion');
  const actual = safeHtml`
    <h1>${val}</h1>
    <ul>
      ${newlines}
      <li>three</li>
    </ul>
  `;
  expect(actual).toBe(expected);
});

test('correctly escapes HTML tags on substitution', async () => {
  const fruits = ['apple', 'banana', 'kiwi', '<h1>dangerous fruit</h1>'];
  const expected = await readFromFixture(__dirname, 'escaped-html');
  const actual = safeHtml`
    <h1>${val}</h1>
    <ul>
      ${fruits.map(fruit => `${fruit}`)}
    </ul>
  `;
  expect(actual).toBe(expected);
});
