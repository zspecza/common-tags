'use strict'

import TemplateTag from './TemplateTag'

// transformers
import trimResultTransformer from './trimResultTransformer'
import stripIndentTransformer from './stripIndentTransformer'
import replaceResultTransformer from './replaceResultTransformer'
import inlineArrayTransformer from './inlineArrayTransformer'
import splitStringTransformer from './splitStringTransformer'

// tags
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
import oneLineInlineLists from './oneLineInlineLists'
import stripIndent from './stripIndent'
import stripIndents from './stripIndents'

export {
  TemplateTag,
  trimResultTransformer,
  stripIndentTransformer,
  replaceResultTransformer,
  inlineArrayTransformer,
  splitStringTransformer,
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
  oneLineInlineLists,
  stripIndent,
  stripIndents
}
