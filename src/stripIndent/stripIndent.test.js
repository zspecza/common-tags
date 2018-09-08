import stripIndent from './stripIndent';
import { readFromFixture } from '../testUtils';

const val = 'amaze';

test('strips indentation', () => {
  const expected = readFromFixture(__dirname, 'stripIndent');
  const actual = stripIndent`
    wow such indent gone
    very ${val}
  `;
  expect(actual).toBe(expected);
});

test('strips larger indentation', () => {
  const expected = readFromFixture(__dirname, 'stripIndent');
  const actual = stripIndent`
      wow such indent gone
      very ${val}
  `;
  expect(actual).toBe(expected);
});

test('maintains deeper indentation', () => {
  const expected = readFromFixture(__dirname, 'maintainIndent');
  const actual = stripIndent`
    wow such indent gone
        very ${val}
  `;
  expect(actual).toBe(expected);
});

test('maintains empty lines', () => {
  const expected = readFromFixture(__dirname, 'maintainEmptyLines');
  const actual = stripIndent`
    wow such indent gone

        very ${val}
  `;
  expect(actual).toBe(expected);
});

test('does nothing if there are no indents', () => {
  const expected = 'wow such doge';
  const actual = stripIndent`wow such doge`;
  expect(actual).toBe(expected);
});

test('does nothing if minimal indent has zero length', () => {
  const expected = 'wow\n such\n doge';
  const actual = stripIndent`wow\n such\n doge`;
  expect(actual).toBe(expected);
});
