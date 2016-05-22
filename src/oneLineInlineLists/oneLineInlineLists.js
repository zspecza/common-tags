'use strict'

import TemplateTag from '../TemplateTag'
import inlineArrayTransformer from '../inlineArrayTransformer'
import trimResultTransformer from '../trimResultTransformer'
import replaceResultTransformer from '../replaceResultTransformer'

const oneLineInlineLists = new TemplateTag(
  inlineArrayTransformer,
  replaceResultTransformer(/(?:\s+)/g, ' '),
  trimResultTransformer
)

export default oneLineInlineLists
