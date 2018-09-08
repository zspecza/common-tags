import oneLineTrim from './oneLineTrim';
import { readFromFixture } from '../testUtils';

const val = 'amaze';

test('reduces to one line while trimming newlines', async () => {
  const expected = readFromFixture(__dirname, 'oneLineTrim');
  const actual = oneLineTrim`
  wow such reduction
  very absence of space
  much ${val}
  `;
  expect(actual).toBe(expected);
});

test('reduces to one line while trimming newlines (no indentation)', async () => {
  const expected = readFromFixture(__dirname, 'oneLineTrim');
  const actual = oneLineTrim`
wow such reduction
very absence of space
much ${val}
  `;
  expect(actual).toBe(expected);
});
