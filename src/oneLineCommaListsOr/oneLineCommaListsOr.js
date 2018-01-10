import TemplateTag from '../TemplateTag';
import inlineArrayTransformer from '../inlineArrayTransformer';
import trimResultTransformer from '../trimResultTransformer';
import replaceResultTransformer from '../replaceResultTransformer';

const oneLineCommaListsOr = new TemplateTag(
  inlineArrayTransformer({ separator: ',', conjunction: 'or' }),
  replaceResultTransformer(/(?:\s+)/g, ' '),
  trimResultTransformer,
);

export default oneLineCommaListsOr;
