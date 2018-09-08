import createTag from '../createTag';

test('does no processing by default', () => {
  const tag = createTag();
  expect(tag`foo`).toBe('foo');
});

test('transformer methods are optional', () => {
  const noMethods = createTag({});
  const noSubNorEnd = createTag({
    onString(str) {
      return str.toUpperCase();
    },
  });
  const noStringNorSub = createTag({
    onEndResult(endResult) {
      return endResult.toUpperCase();
    },
  });
  const noStringNorEnd = createTag({
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

test('calls hooks with an additional context argument', () => {
  const tag = createTag({
    getInitialContext() {
      return { strings: [], subs: [] };
    },
    onString(str, context) {
      context.strings.push(str);
      return str;
    },
    onSubstitution(substitution, resultSoFar, context) {
      context.subs.push({ substitution, resultSoFar });
      return substitution;
    },
    onEndResult(endResult, context) {
      context.endResult = endResult.toUpperCase();
      return context;
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

test('each transformer has its own context', () => {
  let defaultContext;
  const transformerWithDefaultContext = {
    onString(str, context) {
      context.onStringCalled = true;
    },
    onSubstitution(substitution, resultSoFar, context) {
      context.onSubstitutionCalled = true;
    },
    onEndResult(endResult, context) {
      context.onEndResultCalled = true;
      defaultContext = context;
    },
  };

  const context1 = {};
  const transformerWithContext1 = {
    getInitialContext() {
      return context1;
    },
    onString(str, context) {
      context.onStringCalled = true;
    },
    onSubstitution(substitution, resultSoFar, context) {
      context.onSubstitutionCalled = true;
    },
    onEndResult(endResult, context) {
      context.onEndResultCalled = true;
    },
  };

  const context2 = {};
  const transformerWithContext2 = {
    getInitialContext() {
      return context2;
    },
    onString(str, context) {
      context.onStringCalled = true;
    },
    onSubstitution(substitution, resultSoFar, context) {
      context.onSubstitutionCalled = true;
    },
    onEndResult(endResult, context) {
      context.onEndResultCalled = true;
    },
  };

  const tag = createTag(
    transformerWithDefaultContext,
    transformerWithContext1,
    transformerWithContext2,
  );

  tag`foo${42}`;

  expect(defaultContext).toEqual({
    onStringCalled: true,
    onSubstitutionCalled: true,
    onEndResultCalled: true,
  });
  expect(context1).toEqual({
    onStringCalled: true,
    onSubstitutionCalled: true,
    onEndResultCalled: true,
  });
  expect(context2).toEqual({
    onStringCalled: true,
    onSubstitutionCalled: true,
    onEndResultCalled: true,
  });
});

test('calls the "init" hook each time the tag is called', () => {
  const getInitialContext = jest.fn();
  const tag = createTag({ getInitialContext });

  tag`foo`;
  tag`foo`;

  expect(getInitialContext).toHaveBeenCalledTimes(2);
});

test("doesn't handle function arguments specially", () => {
  const plugin = () => ({
    onEndResult(endResult) {
      return endResult.toUpperCase();
    },
  });
  const invalidTag = createTag(plugin);
  expect(invalidTag`foo bar`).toBe('foo bar');

  const properTag = createTag(plugin());
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
  const argumentListTag = createTag(transform1, transform2);
  const arrayTag = createTag([transform1, transform2]);
  expect(argumentListTag`wow ${'foo'}`).toBe('WOW DOGE');
  expect(arrayTag`bow ${'foo'}`).toBe('BOW DOGE');
});

test('supports tail processing of another tag if first argument to tag is a tag', () => {
  const tag = createTag({
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

test('has the correct order when tail processing', () => {
  const upperCaseTag = createTag({
    onEndResult(endResult) {
      expect(endResult).toBe('foo bar\n    500');
      return endResult.toUpperCase();
    },
  });
  const trimTag = createTag({
    onEndResult(endResult) {
      expect(endResult).toBe('\n    foo bar\n    500\n  ');
      return endResult.trim();
    },
  });
  const raw = upperCaseTag(trimTag)`
    foo bar
    ${500}
  `;
  expect(raw).toBe('FOO BAR\n    500');
});

describe('supports using the tag as a plain function', () => {
  test('with a string', () => {
    let onSubstitutionCalls = 0;
    const tag = createTag({
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
    expect(raw).toBe('FOO BAR\n      500');
    expect(onSubstitutionCalls).toBe(0);
  });

  test('with a number', () => {
    let onSubstitutionCalls = 0;
    const tag = createTag({
      onSubstitution() {
        onSubstitutionCalls += 1;
      },
      onEndResult(endResult) {
        return String(endResult);
      },
    });
    const raw = tag(42);
    expect(raw).toBe('42');
    expect(onSubstitutionCalls).toBe(0);
  });
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
  const tag = createTag();
  const result = tag`foo ${val} bar`;

  expect(get).toHaveBeenCalledTimes(3);
  expect(result).toBe('foo 42 bar');
});
