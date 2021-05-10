import { render, screen } from '@testing-library/react';
import App from './App';

var expect = require('expect.js');

function add (a, b) { return a + b; };

test('renders learn react link', () => {
  render(<App />);
});



/* it('fail', function () {
  expect(add(1, 3)).to.equal(10);
}); */