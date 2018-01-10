import test from 'ava';
import html from './html';
import { readFromFixture } from '../utils';

const val = 'amaze';
const nil = null;

test('renders HTML, including arrays', async t => {
  const fruits = ['apple', 'banana', 'kiwi'];
  const expected = await readFromFixture(__dirname, 'html');
  const actual = html`
    <h1>${val}${nil}</h1>
    <ul>
      ${fruits.map(fruit => `<li>${fruit}</li>`)}
    </ul>
  `;
  t.is(actual, expected);
});

test('converts strings containing newlines into proper indented output', async t => {
  const newlines = '<li>one</li>\n<li>two</li>';
  const expected = await readFromFixture(__dirname, 'newline-conversion');
  const actual = html`
    <h1>${val}${nil}</h1>
    <ul>
      ${newlines}
      <li>three</li>
    </ul>
  `;
  t.is(actual, expected);
});

test('does not introduce excess newlines', async t => {
  const newlines = '<li>one</li>\n<li>two</li>';
  const expected = await readFromFixture(__dirname, 'newline-conversion-after-newline');
  const actual = html`
    <h1>${val}${nil}</h1>
    <ul>

      ${newlines}
      <li>three</li>
    </ul>
  `;
  t.is(actual, expected);
});
