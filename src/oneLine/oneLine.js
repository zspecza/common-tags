import createTag from '../createTag/index.js';
import trimResultTransformer from '../trimResultTransformer/index.js';
import replaceResultTransformer from '../replaceResultTransformer/index.js';

const oneLine = createTag(
  replaceResultTransformer(/(?:\n(?:\s*))+/g, ' '),
  trimResultTransformer(),
);

export default oneLine;
