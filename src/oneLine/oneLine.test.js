import oneLine from './oneLine';
import { readFromFixture } from '../testUtils';

const val = 'amaze';

test('reduces text to one line, replacing newlines with spaces', () => {
  const expected = readFromFixture(__dirname, 'oneLine');
  const actual = oneLine`
    wow such doge
    is very ${val}
    at one line neat
    from multiline
  `;
  expect(actual).toBe(expected);
});

test('reduces text to one line, replacing newlines with spaces (no indentation)', () => {
  const expected = readFromFixture(__dirname, 'oneLine');
  const actual = oneLine`
wow such doge
is very ${val}
at one line neat

from multiline
  `;
  expect(actual).toBe(expected);
});

test('preserves whitespace within input lines, replacing only newlines', () => {
  const expected = readFromFixture(__dirname, 'oneLine-sentence');
  const actual = oneLine`
    Sentences also work.  Double
    spacing is preserved.
  `;
  expect(actual).toBe(expected);
});
