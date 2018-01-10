import TemplateTag from '../TemplateTag';
import trimResultTransformer from '../trimResultTransformer';
import replaceResultTransformer from '../replaceResultTransformer';

const oneLine = new TemplateTag(
  replaceResultTransformer(/(?:\n(?:\s*))+/g, ' '),
  trimResultTransformer,
);

export default oneLine;
