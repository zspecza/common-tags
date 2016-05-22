'use strict'

import TemplateTag from '../TemplateTag'
import inlineArrayTransformer from '../inlineArrayTransformer'
import trimResultTransformer from '../trimResultTransformer'
import replaceResultTransformer from '../replaceResultTransformer'

const oneLineCommaListsAnd = new TemplateTag(
  inlineArrayTransformer({ separator: ',', conjunction: 'and' }),
  replaceResultTransformer(/(?:\s+)/g, ' '),
  trimResultTransformer
)

export default oneLineCommaListsAnd
