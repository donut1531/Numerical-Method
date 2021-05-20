import { render, screen } from '@testing-library/react';
import App from './App';
var expect = require('expect.js');


test('check "Numerical" ', () => {
  render(<App />);
  const linkElement = screen.getByText('Numerical');
  expect(linkElement).toBeInTheDocument();
});
