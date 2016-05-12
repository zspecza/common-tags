import test from 'ava'
import {
  default as tags,
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
  stripIndent
} from './'

test('common-tags exports all the right modules', (t) => {
  const exports = [
    tags,
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
    stripIndent
  ]

  t.plan(exports.length)

  exports.forEach((module) => {
    t.true(typeof module === 'function')
  })
})
