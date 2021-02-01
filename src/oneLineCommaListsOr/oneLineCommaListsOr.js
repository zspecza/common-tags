import createTag from '../createTag/index.js';
import inlineArrayTransformer from '../inlineArrayTransformer/index.js';
import trimResultTransformer from '../trimResultTransformer/index.js';
import replaceResultTransformer from '../replaceResultTransformer/index.js';

const oneLineCommaListsOr = createTag(
  inlineArrayTransformer({ separator: ',', conjunction: 'or' }),
  replaceResultTransformer(/(?:\s+)/g, ' '),
  trimResultTransformer(),
);

export default oneLineCommaListsOr;
