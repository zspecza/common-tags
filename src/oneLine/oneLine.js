'use strict'

import TemplateTag from '../TemplateTag'
import trimResultTransformer from '../trimResultTransformer'
import replaceSequentialSpaceTransformer from '../replaceSequentialSpaceTransformer'

const oneLine = new TemplateTag(
  replaceSequentialSpaceTransformer,
  trimResultTransformer
)

export default oneLine
