'use strict'

import TemplateTag from '../TemplateTag'
import stripIndentTransformer from '../stripIndentTransformer'
import trimResultTransformer from '../trimResultTransformer'

const stripIndent = new TemplateTag(
  stripIndentTransformer,
  trimResultTransformer
)

export default stripIndent
