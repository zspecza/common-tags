export default function tags (opts) {
  const settings = {
    trim: true,
    oneLine: false,
    stripIndent: false,
    includeArrays: false,
    ...opts
  }
  // return a tag function that transforms our template
  return function tag (template, ...expressions) {
    // join the parts necessary to re-construct the template
    let temp = template.reduce((accumulator, part, i) => {
      let expression = expressions[i - 1]
      if (settings.includeArrays && Array.isArray(expression)) {
        const sep = settings.includeArrays.separator || ''
        const con = settings.includeArrays.conjunction
        // inline arrays, making sure to include item separator
        expression = expression.join(sep + accumulator.match(/(\s+)$/)[1])
        if (con) {
          // replace the last separator with the conjunction
          const sepIndex = expression.lastIndexOf(sep)
          expression = expression.substr(0, sepIndex) + ' ' + con + expression.substr(sepIndex + 1)
        }
      }
      return accumulator + expression + part
    })
    // replace any newlines with spaces if we just want
    // a one liner
    if (settings.oneLine) temp = temp.replace(/(?:\s+)/g, ' ')
    if (settings.oneLineTrim) temp = temp.replace(/(?:\n\s+)/g, '')
    if (settings.stripIndent) {
      // strip leading indents
      const match = temp.match(/^[ \t]*(?=\S)/gm)
      const indent = Math.min(...match.map(el => el.length))
      const regexp = new RegExp('^[ \\t]{' + indent + '}', 'gm')
      temp = indent > 0 ? temp.replace(regexp, '') : temp
    }
    // trim leading and trailing whitespace
    if (settings.trim) temp = temp.trim()
    return temp
  }
}
