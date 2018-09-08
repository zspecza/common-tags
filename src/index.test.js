import fs from 'fs';
import path from 'path';
import mm from 'micromatch';
import node from 'when/node';

const observe = ['*', '!utils', '!index.js', '!index.test.js'];

const context = {};

beforeEach(async () => {
  context.modules = mm(await node.call(fs.readdir, __dirname), observe);
});

function requireModule(module) {
  return require(path.join(__dirname, module));
}

test('common-tags exports all the right modules directly', async () => {
  const modules = context.modules;
  expect.assertions(modules.length);
  modules.forEach(module => {
    expect(requireModule(module)).toBeDefined();
  });
});

test('common-tags exports all the right modules as props', async () => {
  const modules = context.modules;
  expect.assertions(modules.length);
  modules.forEach(module => {
    expect(require('./index')).toHaveProperty(module, requireModule(module));
  });
});
