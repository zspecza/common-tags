import createTag from '../createTag';
import inlineArrayTransformer from '../inlineArrayTransformer';
import trimResultTransformer from '../trimResultTransformer';
import replaceResultTransformer from '../replaceResultTransformer';

const oneLineCommaListsOr = createTag(
  inlineArrayTransformer({ separator: ',', conjunction: 'or' }),
  replaceResultTransformer(/(?:\s+)/g, ' '),
  trimResultTransformer(),
);

export default oneLineCommaListsOr;
