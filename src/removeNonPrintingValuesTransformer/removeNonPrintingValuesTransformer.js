const isValidValue = x => x != null && !Number.isNaN(x) && typeof x !== 'boolean'

const removeNonPrintingValuesTransformer = () => ({
  onSubstitution(substitution) {
    if (Array.isArray(substitution)) {
      return substitution.filter(isValidValue)
    }
    if (isValidValue(substitution)) {
      return substitution
    }
    return ''
  },
})

export default removeNonPrintingValuesTransformer
