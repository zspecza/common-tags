import stripIndents from './stripIndents';
import { readFromFixture } from '../utils';

const val = 'amaze';

test('strips all indentation', async () => {
  const expected = await readFromFixture(__dirname, 'stripIndents');
  const actual = stripIndents`
    wow such indent gone
      very ${val}
        foo bar baz
  `;
  expect(actual).toBe(expected);
});

test('maintains empty lines', async () => {
  const expected = await readFromFixture(__dirname, 'maintainEmptyLines');
  const actual = stripIndents`
    wow such indent gone
      very ${val}

        foo bar baz
  `;
  expect(actual).toBe(expected);
});
