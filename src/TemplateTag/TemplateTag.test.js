'use strict'

import test from 'ava'
import TemplateTag from '../TemplateTag'

test('does no processing by default', (t) => {
  const tag = new TemplateTag()
  t.is(tag`foo`, 'foo')
})

test('transformer methods are optional', (t) => {
  const noMethods = new TemplateTag({})
  const noSub = new TemplateTag({
    onEndResult (endResult) {
      return endResult.toUpperCase()
    }
  })
  const noEnd = new TemplateTag({
    onSubstitution (sub) {
      return sub.split('').reverse().join('')
    }
  })
  t.is(noMethods`foo`, 'foo')
  t.is(noSub`bar`, 'BAR')
  t.is(noEnd`foo ${'bar'}`, 'foo rab')
})

test('performs a transformation & provides correct values to transform methods', (t) => {
  const tag = new TemplateTag({
    onSubstitution (substitution, resultSoFar) {
      this.ctx = this.ctx || { subs: [] }
      this.ctx.subs.push({ substitution, resultSoFar })
      return substitution
    },
    onEndResult (endResult) {
      this.ctx.endResult = endResult.toUpperCase()
      return this.ctx
    }
  })
  const data = tag`foo ${'bar'} baz ${'fizz'}`
  t.deepEqual(data, {
    endResult: 'FOO BAR BAZ FIZZ',
    subs: [{
      substitution: 'bar',
      resultSoFar: 'foo '
    }, {
      substitution: 'fizz',
      resultSoFar: 'foo bar baz '
    }]
  })
})

test('automatically initiates a transformer if passed as a function', (t) => {
  const plugin = () => ({
    onEndResult (endResult) {
      return endResult.toUpperCase()
    }
  })
  const tag = new TemplateTag(plugin)
  t.is(tag`foo bar`, 'FOO BAR')
})

test('supports pipeline of transformers as both argument list and as array', (t) => {
  const transform1 = {
    onSubstitution (substitution) {
      return substitution.replace('foo', 'doge')
    }
  }
  const transform2 = {
    onEndResult (endResult) {
      return endResult.toUpperCase()
    }
  }
  const argumentListTag = new TemplateTag(transform1, transform2)
  const arrayTag = new TemplateTag([transform1, transform2])
  t.is(argumentListTag`wow ${'foo'}`, 'WOW DOGE')
  t.is(arrayTag`bow ${'foo'}`, 'BOW DOGE')
})

test('supports tail processing of another tag if first argument to tag is a tag', (t) => {
  const tag = new TemplateTag({
    onEndResult (endResult) {
      return endResult.toUpperCase().trim()
    }
  })
  const raw = tag(String.raw)`
    foo bar
    ${500}
  `
  t.is(raw, 'FOO BAR\n    500')
})
