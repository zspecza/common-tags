'use strict'

import TemplateTag from '../TemplateTag'
import trimResultTransformer from '../trimResultTransformer'
import replaceResultTransformer from '../replaceResultTransformer'

const oneLineTrim = new TemplateTag(
  replaceResultTransformer(/(?:\n\s*)/g, ''),
  trimResultTransformer
)

export default oneLineTrim
