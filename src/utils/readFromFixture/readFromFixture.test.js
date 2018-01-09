import test from 'ava'
import readFromFixture from './readFromFixture'

test('reads the correct fixture contents', async t => {
  const actual = await readFromFixture(__dirname, 'contents')
  const expected = 'wow such doge'
  t.is(actual, expected)
})

test('should reject if no file was found', async t => {
  await t.throws(readFromFixture(__dirname, 'nothing'))
})
