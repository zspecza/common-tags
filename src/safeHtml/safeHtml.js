import createTag from '../createTag';
import stripIndentTransformer from '../stripIndentTransformer';
import inlineArrayTransformer from '../inlineArrayTransformer';
import trimResultTransformer from '../trimResultTransformer';
import splitStringTransformer from '../splitStringTransformer';
import replaceSubstitutionTransformer from '../replaceSubstitutionTransformer';

const safeHtml = createTag(
  splitStringTransformer('\n'),
  inlineArrayTransformer(),
  stripIndentTransformer(),
  trimResultTransformer(),
  replaceSubstitutionTransformer(/&/g, '&amp;'),
  replaceSubstitutionTransformer(/</g, '&lt;'),
  replaceSubstitutionTransformer(/>/g, '&gt;'),
  replaceSubstitutionTransformer(/"/g, '&quot;'),
  replaceSubstitutionTransformer(/'/g, '&#x27;'),
  replaceSubstitutionTransformer(/`/g, '&#x60;'),
);

export default safeHtml;
