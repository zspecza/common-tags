import TemplateTag from '../TemplateTag';
import inlineArrayTransformer from '../inlineArrayTransformer';
import trimResultTransformer from '../trimResultTransformer';
import replaceResultTransformer from '../replaceResultTransformer';

const oneLineCommaLists = new TemplateTag(
  inlineArrayTransformer({ separator: ',' }),
  replaceResultTransformer(/(?:\s+)/g, ' '),
  trimResultTransformer,
);

export default oneLineCommaLists;
