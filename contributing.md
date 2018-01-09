# Contribution Guidelines

## Setup

1. Fork this repository
2. `git clone` your fork down to your local machine
3. `cd` into the directory for your fork
4. run `npm install`

## Tests

Please include _passing_ tests for any new logic or features you include in your contribution. This project uses [AVA](/sindresorhus/ava) to run tests and is setup to look for files that end with `.test.js` in the `src` directory.

Furthermore, this project uses [Prettier](/prettier/prettier) for code formatting,
and tests will _fail_ if your code does is not formatted properly
(run `npm lint` or `npm lint:fix` to check/fix the code).
