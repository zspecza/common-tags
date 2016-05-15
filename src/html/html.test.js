'use strict'

import test from 'ava'
import html from './html'
import {readFromFixture} from '../utils'

const val = 'amaze'

test('renders HTML, including arrays', async (t) => {
  const fruits = ['apple', 'banana', 'kiwi']
  const expected = await readFromFixture('html')
  const actual = html`
    <h1>${val}</h1>
    <ul>
      ${fruits.map((fruit) => `<li>${fruit}</li>`)}
    </ul>
  `
  t.is(actual, expected)
})
