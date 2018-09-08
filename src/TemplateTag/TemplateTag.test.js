import TemplateTag from '../TemplateTag';

beforeEach(() => {
  console.warn = jest.fn();
});

test('a warning should be printed the first time a TemplateTag is constructed', () => {
  expect(console.warn).toHaveBeenCalledTimes(0);

  new TemplateTag();

  expect(console.warn).toHaveBeenCalledTimes(1);
  expect(console.warn).toHaveBeenCalledWith(
    expect.stringContaining('Use createTag instead'),
  );

  new TemplateTag();

  expect(console.warn).toHaveBeenCalledTimes(1);
});

test('performs a transformation & provides correct values to transform methods', () => {
  const tag = new TemplateTag({
    onString(str) {
      this.ctx = this.ctx || { strings: [], subs: [] };
      this.ctx.strings.push(str);
      return str;
    },
    onSubstitution(substitution, resultSoFar) {
      this.ctx.subs.push({ substitution, resultSoFar });
      return substitution;
    },
    onEndResult(endResult) {
      this.ctx.endResult = endResult.toUpperCase();
      return this.ctx;
    },
  });
  const data = tag`foo ${'bar'} baz ${'fizz'}`;
  expect(data).toEqual({
    endResult: 'FOO BAR BAZ FIZZ',
    strings: ['foo ', ' baz ', ''],
    subs: [
      {
        substitution: 'bar',
        resultSoFar: 'foo ',
      },
      {
        substitution: 'fizz',
        resultSoFar: 'foo bar baz ',
      },
    ],
  });
});
