import TemplateTag from '../TemplateTag';

/**
 * Consumes a pipeline of composable transformer plugins and produces a template tag.
 * @param  {...Object} [...transformers] - an array or arguments list of transformers
 * @return {Function}                    - a template tag
 */
export default function createTag(...transformers) {
  return new TemplateTag(...transformers);
}
