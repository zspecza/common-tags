import TemplateTag from '../TemplateTag';

test('does no processing by default', () => {
  const tag = new TemplateTag();
  expect(tag`foo`).toBe('foo');
});

test('transformer methods are optional', () => {
  const noMethods = new TemplateTag({});
  const noSubNorEnd = new TemplateTag({
    onString(str) {
      return str.toUpperCase();
    },
  });
  const noStringNorSub = new TemplateTag({
    onEndResult(endResult) {
      return endResult.toUpperCase();
    },
  });
  const noStringNorEnd = new TemplateTag({
    onSubstitution(sub) {
      return sub
        .split('')
        .reverse()
        .join('');
    },
  });
  expect(noMethods`foo`).toBe('foo');
  expect(noSubNorEnd`foo ${'bar'} baz`).toBe('FOO bar BAZ');
  expect(noStringNorSub`bar`).toBe('BAR');
  expect(noStringNorEnd`foo ${'bar'}`).toBe('foo rab');
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

test("doesn't handle function arguments specially", () => {
  const plugin = () => ({
    onEndResult(endResult) {
      return endResult.toUpperCase();
    },
  });
  const invalidTag = new TemplateTag(plugin);
  expect(invalidTag`foo bar`).toBe('foo bar');

  const properTag = new TemplateTag(plugin());
  expect(properTag`foo bar`).toBe('FOO BAR');
});

test('supports pipeline of transformers as both argument list and as array', () => {
  const transform1 = {
    onSubstitution(substitution) {
      return substitution.replace('foo', 'doge');
    },
  };
  const transform2 = {
    onEndResult(endResult) {
      return endResult.toUpperCase();
    },
  };
  const argumentListTag = new TemplateTag(transform1, transform2);
  const arrayTag = new TemplateTag([transform1, transform2]);
  expect(argumentListTag`wow ${'foo'}`).toBe('WOW DOGE');
  expect(arrayTag`bow ${'foo'}`).toBe('BOW DOGE');
});

test('supports tail processing of another tag if first argument to tag is a tag', () => {
  const tag = new TemplateTag({
    onEndResult(endResult) {
      return endResult.toUpperCase().trim();
    },
  });
  const raw = tag(String.raw)`
    foo bar
    ${500}
  `;
  expect(raw).toBe('FOO BAR\n    500');
});

test('supports passing string as a first argument', () => {
  let onSubstitutionCalls = 0;
  const tag = new TemplateTag({
    onSubstitution() {
      onSubstitutionCalls += 1;
    },
    onEndResult(endResult) {
      return endResult.toUpperCase().trim();
    },
  });
  const raw = tag(`
    foo bar
    ${500}
  `);
  expect(raw).toBe('FOO BAR\n    500');
  expect(onSubstitutionCalls).toBe(0);
});

test('transforms substitutions to string as per spec', () => {
  const get = jest
    .fn()
    .mockImplementationOnce((target, prop) => {
      expect(prop).toBe(Symbol.toPrimitive);
    })
    .mockImplementationOnce((target, prop) => {
      expect(prop).toBe('toString');
    })
    .mockImplementationOnce((target, prop) => {
      expect(prop).toBe('valueOf');
      return () => 42;
    });

  const val = new Proxy({}, { get });
  const tag = new TemplateTag();
  const result = tag`foo ${val} bar`;

  expect(get).toHaveBeenCalledTimes(3);
  expect(result).toBe('foo 42 bar');
});
