'use strict'

import tags from '../tags'

export default tags({
  stripIndent: true,
  includeArrays: {
    separator: ',',
    conjunction: 'and'
  }
})
