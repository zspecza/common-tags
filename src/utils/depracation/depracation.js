'use strict'

export default function depracation (err) {
  const label = '[common-tags]:'
  const lineSpace = new Array(label.length + 1).fill(' ').join('')
  const line = err.stack.split('\n')[2].trim()
  return console.warn(label, err.message, `\n${lineSpace + line}`)
}
