import createTag from '../createTag';

let deprecationWarningPrinted = false;

/**
 * @class TemplateTag
 * @classdesc Consumes a pipeline of composable transformer plugins and produces a template tag.
 */
export default class TemplateTag {
  /**
   * constructs a template tag
   * @constructs TemplateTag
   * @param  {...Object} [...transformers] - an array or arguments list of transformers
   * @return {Function}                    - a template tag
   */
  constructor(...transformers) {
    if (!deprecationWarningPrinted) {
      // eslint-disable-next-line no-console
      console.warn(
        'TemplateTag is deprecated and will be removed in the next major version. Use createTag instead.',
      );
      deprecationWarningPrinted = true;
    }

    return createTag(...transformers);
  }
}
