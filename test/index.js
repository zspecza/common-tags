import {expect} from 'chai';
import tags from '../lib';

describe('tags', () => {

  it('should reduce to one line', () => {
    const tag = tags({ oneLine: true });
    const num = 'one';
    expect(tag`
      this should be reduced
      to ${num} line
      and work with
      variables
    `).to.equal('this should be reduced to one line and work with variables');
  });

  it('should strip indents', () => {
    const tag = tags({ stripIndent: true });
    const lan = 'en';
    expect(tag`
      <html lang="${lan}">
        <body>
        </body>
      </html>
    `).to.equal([
      '<html lang="en">',
      '  <body>',
      '  </body>',
      '</html>'
    ].join('\n'));
  });

  it('should allow me to inline a list', () => {
    const tag = tags({
      oneLine: true,
      includeArrays: {
        separator: ',',
        conjunction: 'and'
      }
    });
    const fruits = ['apples', 'bananas', 'kiwi'];
    expect(tag`
      I like fruits, but
      I especially like
      ${fruits}.
    `).to.equal('I like fruits, but I especially like apples, bananas and kiwi.');
  });

  it('should allow me to include a list that maintains indents', () => {
    const tag = tags({ stripIndent: true, includeArrays: true });
    const fruits = ['apples', 'bananas', 'kiwi'];
    expect(tag`
      <div class="list">
        <ul>
          ${fruits.map(fruit => `<li>${fruit}</li>`)}
        </ul>
      </div>
    `).to.equal([
      '<div class="list">',
      '  <ul>',
      '    <li>apples</li>',
      '    <li>bananas</li>',
      '    <li>kiwi</li>',
      '  </ul>',
      '</div>'
    ].join('\n'));
  });

  it('setting trim to false should not remove outer padding', () => {
    const tag = tags({ trim: false });
    expect(tag`  test  `).to.equal('  test  ');
  });

  it('stripIndent should not modify the template if there are no indents', () => {
    const tag = tags({ stripIndent: true });
    expect(tag`test`).to.equal('test');
  });

});
