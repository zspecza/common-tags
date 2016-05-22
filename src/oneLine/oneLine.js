'use strict'

import TemplateTag from '../TemplateTag'
import trimResultTransformer from '../trimResultTransformer'
import replaceResultTransformer from '../replaceResultTransformer'

const oneLine = new TemplateTag(
  replaceResultTransformer(/(?:\s+)/g, ' '),
  trimResultTransformer
)

export default oneLine
