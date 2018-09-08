import html from './html';
import { readFromFixture } from '../testUtils';

const val = 'amaze';
const nil = null;

test('renders HTML, including arrays', async () => {
  const fruits = ['apple', 'banana', 'kiwi'];
  const expected = readFromFixture(__dirname, 'html');
  const actual = html`
    <h1>${val}${nil}</h1>
    <ul>
      ${fruits.map(fruit => `<li>${fruit}</li>`)}
    </ul>
  `;
  expect(actual).toBe(expected);
});

test('converts strings containing newlines into proper indented output', async () => {
  const newlines = '<li>one</li>\n<li>two</li>';
  const expected = readFromFixture(__dirname, 'newline-conversion');
  const actual = html`
    <h1>${val}${nil}</h1>
    <ul>
      ${newlines}
      <li>three</li>
    </ul>
  `;
  expect(actual).toBe(expected);
});

test('does not introduce excess newlines', async () => {
  const newlines = '<li>one</li>\n<li>two</li>';
  const expected = readFromFixture(
    __dirname,
    'newline-conversion-after-newline',
  );
  const actual = html`
    <h1>${val}${nil}</h1>
    <ul>

      ${newlines}
      <li>three</li>
    </ul>
  `;
  expect(actual).toBe(expected);
});
