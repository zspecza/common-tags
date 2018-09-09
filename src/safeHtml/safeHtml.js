import createTag from '../createTag';
import stripIndent from '../stripIndent';
import inlineArrayTransformer from '../inlineArrayTransformer';
import splitStringTransformer from '../splitStringTransformer';
import replaceSubstitutionTransformer from '../replaceSubstitutionTransformer';

const safeHtml = createTag(
  splitStringTransformer('\n'),
  inlineArrayTransformer(),
  stripIndent,
  replaceSubstitutionTransformer(/&/g, '&amp;'),
  replaceSubstitutionTransformer(/</g, '&lt;'),
  replaceSubstitutionTransformer(/>/g, '&gt;'),
  replaceSubstitutionTransformer(/"/g, '&quot;'),
  replaceSubstitutionTransformer(/'/g, '&#x27;'),
  replaceSubstitutionTransformer(/`/g, '&#x60;'),
);

export default safeHtml;
