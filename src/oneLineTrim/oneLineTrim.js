import createTag from '../createTag';
import trimResultTransformer from '../trimResultTransformer';
import replaceResultTransformer from '../replaceResultTransformer';

const oneLineTrim = createTag(
  replaceResultTransformer(/(?:\n\s*)/g, ''),
  trimResultTransformer(),
);

export default oneLineTrim;
