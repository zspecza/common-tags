import TemplateTag from '../TemplateTag';
import stripIndentTransformer from '../stripIndentTransformer';
import inlineArrayTransformer from '../inlineArrayTransformer';
import trimResultTransformer from '../trimResultTransformer';

const inlineLists = new TemplateTag(
  inlineArrayTransformer,
  stripIndentTransformer,
  trimResultTransformer,
);

export default inlineLists;
