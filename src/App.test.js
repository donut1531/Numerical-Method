import { render ,screen } from '@testing-library/react';
import App from './App';

var expect = require('expect.js');

function add (a, b) { return a + b; };



test('Numerical Method', () => {
  render(<App />);
  const linkElement = screen.getByText('Numerical Method');
  expect(linkElement).toBeInTheDocument();
});

it('should do math', function () {
  expect(console.log(add(1, 3)))
  expect(add(1, 3)).to.equal(4);
});

/* it('fail', function () {
  expect(add(1, 3)).to.equal(10);
}); */