import { render, screen } from '@testing-library/react';
import App from './App';

var expect = require('expect.js');

function add (a, b) { return a + b; };

test('Test Home Page', () => {
  render(<App />);
}

);
// it('success', function () {
//   expect(add(1, 3)).to.equal(4);
// }


//  it('fail', function () {
//   expect(add(1, 3)).to.equal(10);
// }); 