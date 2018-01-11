import stripIndent from './stripIndent';
import { readFromFixture } from '../utils';

const val = 'amaze';

test('strips indentation', async () => {
  const expected = await readFromFixture(__dirname, 'stripIndent');
  const actual = stripIndent`
    wow such indent gone
    very ${val}
  `;
  expect(actual).toBe(expected);
});

test('strips larger indentation', async () => {
  const expected = await readFromFixture(__dirname, 'stripIndent');
  const actual = stripIndent`
      wow such indent gone
      very ${val}
  `;
  expect(actual).toBe(expected);
});

test('maintains deeper indentation', async () => {
  const expected = await readFromFixture(__dirname, 'maintainIndent');
  const actual = stripIndent`
    wow such indent gone
        very ${val}
  `;
  expect(actual).toBe(expected);
});

test('maintains empty lines', async () => {
  const expected = await readFromFixture(__dirname, 'maintainEmptyLines');
  const actual = stripIndent`
    wow such indent gone

        very ${val}
  `;
  expect(actual).toBe(expected);
});

test('does nothing if there are no indents', async () => {
  const expected = 'wow such doge';
  const actual = stripIndent`wow such doge`;
  expect(actual).toBe(expected);
});

test('does nothing if minimal indent has zero length', async () => {
  const expected = 'wow\n such\n doge';
  const actual = stripIndent`wow\n such\n doge`;
  expect(actual).toBe(expected);
});
