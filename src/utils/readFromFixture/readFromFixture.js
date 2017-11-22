'use strict'

import fs from 'fs'
import path from 'path'
import node from 'when/node'

/**
 * reads the text contents of <name>.txt in the fixtures folder
 * relative to the caller module's test file
 * @param  {String} name - the name of the fixture you want to read
 * @return {Promise<String>} - the retrieved fixture's file contents
 */
export default function readFromFixture (dirname, name) {
  return node.call(fs.readFile, path.join(dirname, `fixtures/${name}.txt`), 'utf8')
    .then((contents) => contents.replace(/\r\n/g, '\n').trim())
}
