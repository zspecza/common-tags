import oneLineTrim from './oneLineTrim';
import { readFromFixture } from '../utils';

const val = 'amaze';

test('reduces to one line while trimming newlines', async () => {
  const expected = await readFromFixture(__dirname, 'oneLineTrim');
  const actual = oneLineTrim`
  wow such reduction
  very absence of space
  much ${val}
  `;
  expect(actual).toBe(expected);
});

test('reduces to one line while trimming newlines (no indentation)', async () => {
  const expected = await readFromFixture(__dirname, 'oneLineTrim');
  const actual = oneLineTrim`
wow such reduction
very absence of space
much ${val}
  `;
  expect(actual).toBe(expected);
});
