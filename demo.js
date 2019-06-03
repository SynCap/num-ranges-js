const Ranges = require("./ranges");

console.log("Ranges.JS Examples");

// Example
const r = new Ranges();
r.add([1, 4]);
r.print();
// Should display: [1, 4]
r.add([10, 20]);
r.print();
// Should display: [1, 4] [10, 20]
r.add([10, 10]);
r.print();
// Should display: [1, 4] [10, 20]
r.add([21, 21]);
r.print();
// Should display: [1, 4] [10, 21]
r.add([2, 4]);
r.print();
// Should display: [1, 4] [10, 21]
r.add([3, 8]);
r.print();
// Should display: [1, 8] [10, 21]
r.remove([10, 10]);
r.print();
// Should display: [1, 8] [11, 21]
r.remove([10, 11]);
r.print();
// Should display: [1, 8] [12, 21]
r.remove([15, 17]);
r.print();
// Should display: [1, 8] [12, 14] [18, 21]
r.remove([3, 19]);
r.print();
// Should display: [1, 2] [20, 21]