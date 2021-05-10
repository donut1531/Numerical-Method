
function add (a, b) { return a * b; };

var expect = require('expect.js');

it('should do math', function () {
  expect(console.log(add(4, 4)))
  expect(add(4, 4)).to.equal(16);
});