'use strict'

import TemplateTag from '../TemplateTag'
import stripIndentTransformer from '../stripIndentTransformer'
import inlineArrayTransformer from '../inlineArrayTransformer'
import trimResultTransformer from '../trimResultTransformer'
import splitStringTransformer from '../splitStringTransformer'

const html = new TemplateTag(
  splitStringTransformer('\n'),
  inlineArrayTransformer,
  stripIndentTransformer,
  trimResultTransformer
)

export default html
