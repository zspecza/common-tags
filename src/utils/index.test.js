import fs from 'fs';
import path from 'path';
import mm from 'micromatch';
import node from 'when/node';

const observe = ['*', '!index.js', '!index.test.js'];

const context = {};

beforeEach(async () => {
  context.modules = mm(await node.call(fs.readdir, __dirname), observe);
});

test('utils exports all the right modules directly', async () => {
  const modules = context.modules;
  expect.assertions(modules.length);
  modules.forEach(module => {
    const _path = path.join(__dirname, module);
    expect(require(_path) != null).toBe(true);
  });
});

test('utils exports all the right modules as props', async () => {
  const modules = context.modules;
  expect.assertions(modules.length);
  modules.forEach(module => {
    expect(require('./index')[module] != null).toBe(true);
  });
});
