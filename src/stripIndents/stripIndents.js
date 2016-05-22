'use strict'

import TemplateTag from '../TemplateTag'
import stripIndentTransformer from '../stripIndentTransformer'
import trimResultTransformer from '../trimResultTransformer'

const stripIndents = new TemplateTag(
  stripIndentTransformer('all'),
  trimResultTransformer
)

export default stripIndents
