// Task: Implement a class named 'Ranges'

// Example of a range [1, 4] - includes integers: 1, 2, 3, and 4.
// Example of a list: [1, 4], [109, 206], [400, 600]

module.exports = class Ranges {
    constructor(value) {
        if (value && !Array.isArray(value))
            throw 'Initial value must be Array of ranges -- 2 digit length arrays';

        if (value)
            value.forEach(x => this.validate(x));

        this.value = value || [];
    }

    validate(range) {
        if (!Array.isArray(range))
            throw `Rane must be an Array type. Now has type "${typeof range}"`;

        if (range.length !== 2)
            throw `Range Array must be 2 Number long! Now is ${range.length}`;

        if (!parseInt(range[0]) || !parseInt(range[1]))
            throw `
			Both of elements of Range array must be Numbers or have to be convinient to convert to Numbers!
			typeof element1: ${typeof range[0]}
			typeof element2: ${typeof range[1]}`;

        if (range[0] > range[1])
            throw `First element of Range can't be greater than second.
			Element1: ${range[0]}
			Element2: ${range[1]}`;
    }

    /**
     * Helper function that fills the array with values from specified range
     */
    _get_seq([since, till]) {
        return Array.from({ length: till - since + 1 }, (_, i) => since + i);
    }

    _compact_seq(seq) {

        // Щас начнётся
        var acc = [],
            prevN = seq[0],
            prevStart = seq[0];

        // свернём последовательности в список диапазонов !!
        seq.forEach((val, idx) => {
            if (prevN > val)
                throw 'Sequence is not sorted properly.'
            if (!!idx && val > prevN + 1) {
                acc.push([prevStart, prevN]);
                prevStart = val;
            }
            prevN = val;
        });
        acc.push([prevStart, prevN]);

        return acc;
    }

    /**
     * Adds a range to the list
     */
    add(range) {
        this.validate(range);

        // впихуем невпихуемое -- развернём диапазоны в натуральные последовательности
        var tmpSet = new Set(this._get_seq(range));
        this.value.forEach(subrange => {
            tmpSet = new Set([...tmpSet, ...this._get_seq(subrange)]);
        }); // Памяти жрать будееет...

        return this.value = this._compact_seq(new Uint32Array(tmpSet).sort());
    }

    /**
     * Removes a range from the list
     */
    remove(range) {
        this.validate(range);
        var tmpSet = new Set();
        this.value.forEach(subrange => {
            tmpSet = new Set([...tmpSet, ...this._get_seq(subrange)])
        });

        return this.value = this._compact_seq(new Uint32Array(tmpSet).filter(x => x < range[0] || x > range[1]));
    }

    /**
     * Returns the list of ranges as Array of Ranges
     */
    get list() {
        return this.value;
    }

    toString() {
        return this.value && this.value.length ?
            JSON.stringify(this.value)
            .slice(1, -1)
            .replace(/\],\[/g, "] [")
            .replace(/(?<=\d), *(?=\d)/g, ', ') :
            "<NULL LIST OF RANGES>";
    }

    /**
     * Prints out the list of ranges
     */
    print() {
        console.log(this.toString());
    }
};