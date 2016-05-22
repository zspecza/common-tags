'use strict'

import TemplateTag from '../TemplateTag'
import stripIndentTransformer from '../stripIndentTransformer'
import inlineArrayTransformer from '../inlineArrayTransformer'
import trimResultTransformer from '../trimResultTransformer'

const html = new TemplateTag(
  inlineArrayTransformer,
  stripIndentTransformer,
  trimResultTransformer
)

export default html
