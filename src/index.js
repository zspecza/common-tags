'use strict'

import TemplateTag from './TemplateTag'

// transformers
import trimResultTransformer from './trimResultTransformer'
import stripIndentTransformer from './stripIndentTransformer'

// tags
import tags from './tags'
import commaLists from './commaLists'
import commaListsAnd from './commaListsAnd'
import commaListsOr from './commaListsOr'
import html from './html'
import oneLine from './oneLine'
import oneLineTrim from './oneLineTrim'
import oneLineCommaLists from './oneLineCommaLists'
import oneLineCommaListsOr from './oneLineCommaListsOr'
import oneLineCommaListsAnd from './oneLineCommaListsAnd'
import inlineLists from './inlineLists'
import stripIndent from './stripIndent'

export {
  tags as default,
  TemplateTag,
  trimResultTransformer,
  stripIndentTransformer,
  commaLists,
  commaListsAnd,
  commaListsOr,
  html,
  oneLine,
  oneLineTrim,
  oneLineCommaLists,
  oneLineCommaListsOr,
  oneLineCommaListsAnd,
  inlineLists,
  stripIndent
}
