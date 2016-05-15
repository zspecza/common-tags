'use strict'

import fs from 'fs'
import node from 'when/node'

/**
 * reads the text contents of <name>.txt in the fixtures folder
 * relative to the caller module's test file
 * @param  {String} name - the name of the fixture you want to read
 * @return {Promise<String>} - the retrieved fixture's file contents
 */
export default function readFromFixture (name) {
  return node.call(fs.readFile, `./fixtures/${name}.txt`, 'utf8')
    .then((contents) => contents.trim())
}
