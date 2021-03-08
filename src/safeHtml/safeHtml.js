import createTag from '../createTag/index.js';
import stripIndent from '../stripIndent/index.js';
import inlineArrayTransformer from '../inlineArrayTransformer/index.js';
import splitStringTransformer from '../splitStringTransformer/index.js';
import replaceSubstitutionTransformer from '../replaceSubstitutionTransformer/index.js';

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
