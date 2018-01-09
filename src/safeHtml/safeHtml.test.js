import test from 'ava'
import safeHtml from './safeHtml'
import { readFromFixture } from '../utils'

const val = 'amaze'

test('renders HTML, including arrays', async t => {
  const fruits = ['apple', 'banana', 'kiwi']
  const expected = await readFromFixture(__dirname, 'normal-html')
  const actual = safeHtml`
    <h1>${val}</h1>
    <ul>
      ${fruits.map(fruit => `${fruit}`)}
    </ul>
  `
  t.is(actual, expected)
})

test('converts strings containing newlines into proper indented output', async t => {
  const newlines = 'one\ntwo'
  const expected = await readFromFixture(__dirname, 'newline-conversion')
  const actual = safeHtml`
    <h1>${val}</h1>
    <ul>
      ${newlines}
      <li>three</li>
    </ul>
  `
  t.is(actual, expected)
})

test('correctly escapes HTML tags on substitution', async t => {
  const fruits = ['apple', 'banana', 'kiwi', '<h1>dangerous fruit</h1>']
  const expected = await readFromFixture(__dirname, 'escaped-html')
  const actual = safeHtml`
    <h1>${val}</h1>
    <ul>
      ${fruits.map(fruit => `${fruit}`)}
    </ul>
  `
  t.is(actual, expected)
})
