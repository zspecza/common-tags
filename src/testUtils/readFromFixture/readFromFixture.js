import fs from 'fs';
import path from 'path';

/**
 * reads the text contents of <name>.txt in the fixtures folder
 * relative to the caller module's test file
 * @param  {String} name - the name of the fixture you want to read
 * @return {Promise<String>} - the retrieved fixture's file contents
 */
export default function readFromFixture(dirname, name) {
  const contents = fs.readFileSync(
    path.join(dirname, `fixtures/${name}.txt`),
    'utf8',
  );
  return contents.replace(/\r\n/g, '\n').trim();
}
