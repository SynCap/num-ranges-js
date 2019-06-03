# Class to work with ranges of Numbers

![][banner]

Example of a range `[1, 4]` - includes integers: `1, 2, 3`, and `4`.

Example of a list: `[[1, 4], [109, 206], [400, 600]]`

## Usage

```Javascript
const Ranges = require('./ranges');

const MyRangeList = new Ranges(); // No initial data
const MyRangeList_2 = new Range([[5, 7], [109, 206], [400, 600]]); // Init with data
```
Initial subranges may be placed in any order, but subranges itself must be correct, i.e. first number must be less than second one.

## Methods

### .add(<Range>)

Add subrange to the list. Intersected subranges will be joined.

### .remove(<Range>)

Remove subrange from whole range. Intersected subranges whill be eliminated.

### .toString()

Returns string representation of Ranges list.

### .print()

Output string representation of ranges list to the console.

## Property

### .list

Returns Array of range arrays.

## Cheat card


```Javascript
class Ranges {
    /**
     * Adds a range to the list
     */
    add(range)

    /**
     * Removes a range from the list
     */
    remove(range)

    /**
     * Prints out the list of ranges
     */
    print()

    /**
     * String view of range list
     */
    toString()

    /**
     * List of ranges
     */
    list
}
```
## Tests

```bash
npm install && npm run test
```

or

```bash
yarn && yarn test
```

## Examples:

```Javascript
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
```

[banner]: num-ranges-js-github-og-picture.png
