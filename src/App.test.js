import { render, screen } from '@testing-library/react';
import App from './App';
function add (a, b) { return a * b; };

var expect = require('expect.js');


test('renders learn react link', () => {
  render(<App />);
});
it('should do math', function () {
  expect(console.log(add(4, 4)))
  expect(add(4, 4)).to.equal(16);
});