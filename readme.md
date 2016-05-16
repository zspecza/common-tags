# Common Tags

This is a small library containing ES6/ES2015 template tags I often find myself
using.

Info | Badges
-----|-------
Version | [![github release](https://img.shields.io/github/release/declandewet/common-tags.svg?style=flat-square)](https://github.com/declandewet/common-tags/releases/latest) [![npm version](https://img.shields.io/npm/v/common-tags.svg?style=flat-square)](http://npmjs.org/package/common-tags)
License | [![npm license](https://img.shields.io/npm/l/common-tags.svg?style=flat-square)](https://github.com/declandewet/common-tags/blob/master/license.md)
Popularity | [![npm downloads](https://img.shields.io/npm/dm/common-tags.svg?style=flat-square)](http://npm-stat.com/charts.html?package=common-tags)
Testing | [![Build status](https://ci.appveyor.com/api/projects/status/75eiommx0llt3sgd?svg=true)](https://ci.appveyor.com/project/declandewet/common-tags) [![build status](https://img.shields.io/travis/declandewet/common-tags.svg?style=flat-square)](https://travis-ci.org/declandewet/common-tags) [![codecov.io](https://img.shields.io/codecov/c/gh/declandewet/common-tags.svg?style=flat-square)](https://codecov.io/gh/declandewet/common-tags?branch=master)
Quality | [![dependency status](https://img.shields.io/david/declandewet/common-tags.svg?style=flat-square)](https://david-dm.org/declandewet/common-tags) [![dev dependency status](https://img.shields.io/david/dev/declandewet/common-tags.svg?style=flat-square)](https://david-dm.org/declandewet/common-tags#info=devDependencies)
Style | [![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### Installation:

```sh
$ npm install common-tags --save
```

## Why should you care?

If you want to keep your single-line strings under 80 characters without
resorting to crazy string concatenation:

```js
import {oneLine} from 'common-tags'
let verb = 'crazy'
console.log(oneLine`
  this is a
  super ${verb}
  long string
  that will probably
  exceed our constraint
  of a maximum
  of 80 characters
  in length,
  and we'd probably
  have to horizontally scroll
  our editor
  if we didn't have
  ES6 in our
  utility belt.
`)
```

Outputs:

```
This is a super crazy long string that will probably exceed our constraint of a maximum of 80 characters in length, and we'd probably have to horizontally scroll our editor if we didn't have ES6 in our utility belt.
```

If you want keep your single-line strings under 80 characters while triming the new lines:

```js
import {oneLineTrim} from 'common-tags'
let verb = 'crazy'
console.log(oneLineTrim`
  https://www.google.fr/search?q=common-tags
  &oq=common-tags&aqs=chrome..69i57j0l5.1303j0j7
  &sourceid=chrome&es_sm=91
  &ie=UTF-8#safe=off&q=common-tags+npm
`)
```

Outputs:

```
https://www.google.fr/search?q=common-tags&oq=common-tags&aqs=chrome..69i57j0l5.1303j0j7&sourceid=chrome&es_sm=91&ie=UTF-8#safe=off&q=common-tags+npm`
```

If you want to strip the annoying indentation from the beginning of each line in a multiline string:

```js
import {stripIndent} from 'common-tags';
let verb = 'notice';
console.log(stripIndent`
  This is a multi-line string.
  You'll ${verb} that it is indented.
  We don't want to output this indentation.
    But we do want to keep this line indented.
`);
```

Outputs:

```
This is a multi-line string.
You'll notice that it is indented.
We don't want to output this indentation.
  But we do want to keep this line indented.
```

You'll often find that you might want to include an array in a template. Typically, doing something like
`${array.join(', ')}` would work - but what if you're printing a list of items
in an HTML template and want to maintain the indentation? You'd have to count the
spaces manually and include them in the `.join()` call - which is a bit *ugly* for my taste.

```js
import {html} from 'common-tags'
let fruits = ['apple', 'orange', 'watermelon']
console.log(html`
  <div class="list">
    <ul>
      ${fruits.map(fruit => `<li>${fruit}</li>`)}
    </ul>
  </div>
`);
```

Outputs:

```html
<div class="list">
  <ul>
    <li>apple</li>
    <li>orange</li>
    <li>watermelon</li>
  </ul>
</div>
```

## API

#### Default Export: `tags(<Object:settings>)`

Accepts an object where keys are the
name of tags you wish to combine.
Returns a tag that transforms a
template literal in accordance with the
rules you've set.

For example, to inline arrays as a
comma-separated list, and keep everything on one line:

```js
import tags from 'common-tags'
let fruits = ['apples', 'bananas', 'kiwi']
let tag = tags({
  oneLine: true,
  includeArrays: {
    separator: ',',
    conjunction: 'and'
  }
})
console.log(tag`
  I like fruits, but I especially love
  ${fruits.map(fruit => `${fruit}`)}.
`)
```

Outputs:

```
I like fruits, but I especially love apples, bananas and kiwi.
```

#### Options:

```js
{
  trim: true, // trims leading and trailing whitespace
  oneLine: false, // outputs everything on one line with 1 space between new lines
  oneLineTrim: false, // outputs everything on one line without spaces between new lines
  stripIndent: false, // strips leading indents
  includeArrays: false // inlines arrays
}
```

`includeArrays` can also be an object, which accepts:

```js
{
  separator: null, // set this to the string you want to act as the separator for each item
  conjunction: null // the word you want to appear before the last item
}
```

This module also exports aliases for some commonly used combinations:

- *html*
  - `stripIndent: true`
  - `includeArrays: true`
- *oneLine*
  - `oneLine: true`
- *oneLineTrim*
  - `oneLineTrim: true`
- *inlineLists*
  - `includeArrays: true`
  - `stripIndent: true`
- *stripIndent*
  - `stripIndent: true`
- *commaLists*
  - `includeArrays: { separator: ',' }`
  - `stripIndent: true`
- *commaListsOr*
  - `includeArrays: { separator: ',', conjunction: 'or' }`
  - `stripIndent: true`
- *commaListsAnd*
  - `includeArrays: { separator: ',', conjunction: 'and' }`
  - `stripIndent: true`
- *oneLineCommaLists*
  - `oneLine: true`
  - `includeArrays: { separator: ',' }`
- *oneLineCommaListsOr*
  - `oneLine: true`
  - `includeArrays: { separator: ',', conjunction: 'or' }`
- *oneLineCommaListsAnd*
  - `oneLine: true`
  - `includeArrays: { separator: ',', conjunction: 'and' }`

# Other cool ES6 template tag modules:

- [regexr](https://www.npmjs.org/package/regexr) - provides an ES6 template tag function that makes it easy to compose regexes out of template strings without double-escaped hell.
- [deindent](https://www.npmjs.com/package/deindent) - ES6 template string helper for deindentation (adapted from https://gist.github.com/zenparsing/5dffde82d9acef19e43c).
- [shell-escape-tag](https://www.npmjs.com/package/shell-escape-tag) - An ES6+ template tag which escapes parameters for interpolation into shell commands.
- [sql-tag](https://www.npmjs.com/package/sql-tag) - A template tag for writing elegant sql strings.
- [digraph-tag](https://www.npmjs.com/package/digraph-tag) - ES6 string template tag for quickly generating directed graph data
- [pg-template-tag](https://www.npmjs.com/package/pg-template-tag) - ECMAScript 6 (2015) template tag function to write queries for node-postgres.
