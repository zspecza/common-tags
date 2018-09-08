import stripIndents from './stripIndents';
import { readFromFixture } from '../testUtils';

const val = 'amaze';

test('strips all indentation', () => {
  const expected = readFromFixture(__dirname, 'stripIndents');
  const actual = stripIndents`
    wow such indent gone
      very ${val}
        foo bar baz
  `;
  expect(actual).toBe(expected);
});

test('maintains empty lines', () => {
  const expected = readFromFixture(__dirname, 'maintainEmptyLines');
  const actual = stripIndents`
    wow such indent gone
      very ${val}

        foo bar baz
  `;
  expect(actual).toBe(expected);
});
