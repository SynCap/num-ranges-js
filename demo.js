/* eslint-disable no-console */
const Ranges = require('./ranges');
const spoyom = require('./pestnya');

console.log('__________________\n');
console.log('Ranges.JS Examples');
console.log('==================\n');

// Example
const r = new Ranges();

console.log('Ranges is ready!');

spoyom(true, 'Add range', '[1 … 4]');
r.add([1, 4]);
r.print();
// Should display: [1, 4]

spoyom(true, 'Add range', '[10 … 20]');
r.add([10, 20]);
r.print();
// Should display: [1, 4] [10, 20]

spoyom(true, 'Add range', '[10 … 10]');
r.add([10, 10]);
r.print();
// Should display: [1, 4] [10, 20]

spoyom(true, 'Add range', '[21 … 21]');
r.add([21, 21]);
r.print();
// Should display: [1, 4] [10, 21]

spoyom(true, 'Add range', '[2 … 4]');
r.add([2, 4]);
r.print();
// Should display: [1, 4] [10, 21]

spoyom(true, 'Add range', '[3 … 8]');
r.add([3, 8]);
r.print();
// Should display: [1, 8] [10, 21]

spoyom(false, 'Remove range', '[10 … 10]');
r.remove([10, 10]);
r.print();
// Should display: [1, 8] [11, 21]

spoyom(false, 'Remove range', '[10 … 11]');
r.remove([10, 11]);
r.print();
// Should display: [1, 8] [12, 21]

spoyom(false, 'Remove range', '[15 … 17]');
r.remove([15, 17]);
r.print();
// Should display: [1, 8] [12, 14] [18, 21]

spoyom(false, 'Remove range', '[3 … 19]');
r.remove([3, 19]);
r.print();
// Should display: [1, 2] [20, 21]
