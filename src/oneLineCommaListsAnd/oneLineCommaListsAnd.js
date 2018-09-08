import createTag from '../createTag';
import inlineArrayTransformer from '../inlineArrayTransformer';
import trimResultTransformer from '../trimResultTransformer';
import replaceResultTransformer from '../replaceResultTransformer';

const oneLineCommaListsAnd = createTag(
  inlineArrayTransformer({ separator: ',', conjunction: 'and' }),
  replaceResultTransformer(/(?:\s+)/g, ' '),
  trimResultTransformer(),
);

export default oneLineCommaListsAnd;
