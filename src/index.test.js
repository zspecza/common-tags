'use strict'

import test from 'ava'

import {
  default as tags,
  TemplateTag,
  trimResultTransformer,
  stripIndentTransformer,
  replaceResultTransformer,
  inlineArrayTransformer,
  commaLists,
  commaListsAnd,
  commaListsOr,
  html,
  inlineLists,
  oneLine,
  oneLineCommaLists,
  oneLineCommaListsAnd,
  oneLineCommaListsOr,
  oneLineTrim,
  stripIndent,
  stripIndents
} from './'

test('common-tags exports all the right modules', (t) => {
  const exports = [
    tags,
    TemplateTag,
    trimResultTransformer,
    stripIndentTransformer,
    replaceResultTransformer,
    inlineArrayTransformer,
    commaLists,
    commaListsAnd,
    commaListsOr,
    html,
    inlineLists,
    oneLine,
    oneLineCommaLists,
    oneLineCommaListsAnd,
    oneLineCommaListsOr,
    oneLineTrim,
    stripIndent,
    stripIndents
  ]

  t.plan(exports.length)

  exports.forEach((module) => {
    t.true(typeof module === 'function')
  })
})
