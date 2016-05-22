'use strict'

/**
 * Replaces tabs, newlines and spaces with the chosen value when they occur in sequences
 * @param  {*} value = ' ' - the value to replace the sequence with
 * @return {Object}        - a TemplateTag transformer
 */
const replaceSequentialSpaceTransformer = (space = ' ') => ({
  onEndResult (endResult) {
    return endResult.replace(/(?:\s+)/g, space)
  }
})

export default replaceSequentialSpaceTransformer
