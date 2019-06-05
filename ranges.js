/**
 *
 * Numeric ranges list manipulation class
 *
 * @Example of a Range      [1, 4] - includes integers: 1, 2, 3, and 4.
 * @Example of a Range List [[1, 4], [109, 206], [400, 600]]
 *
 * @method add      ( <Range> ): [Array]    add Range to list and interssect it with existing
 * @method remove   ( <Range> ): [Array]    exclude Range from the list, and "punch" ranges if needed
 * @method print    ( none    ): [Array]    print stirng representation of list to the console
 * @method toString ( none    ): [String]   convert range list to
 * @method validate ( <Range> ): [Boolean]  validate Range to be correct for
 *                               further use. Returns `true` on success, or throw exceptions othervise
 *
 * @property list : [Array] return whole list of ranges
 *
 * @inner _compact_seq ( <Array> ): [Array[Array]] convert joined sequencies of Numbers into List of Ranges
 * @inner _get_seq     ( <Range> ): [Array]	expands Range to array of Numbers that Range represents
 */

module.exports = class Ranges {
	constructor(value) {
		if (value && !Array.isArray(value))
			throw 'Initial value must be Array of ranges -- 2 digit length arrays';

		if (value) value.forEach(x => this.validate(x));

		this.value = value || [];
	}

	validate(range) {
		if (!Array.isArray(range)) throw `Rane must be an Array type. Now has type "${typeof range}"`;

		if (range.length !== 2) throw `Range Array must be 2 Number long! Now is ${range.length}`;

		if (!parseInt(range[0]) || !parseInt(range[1]))
			throw `
			Both of elements of Range array must be Numbers or have to be convinient to convert to Numbers!
			typeof element1: ${typeof range[0]}
			typeof element2: ${typeof range[1]}`;

		if (range[0] > range[1])
			throw `First element of Range can't be greater than second.
			Element1: ${range[0]}
            Element2: ${range[1]}`;

		return true;
	}

	/**
	 * Helper function that fills the array with values from specified range
	 * Needs to expand the particular range to series of number that range
	 * present. That sequencies are used in later caulculations.
	 *
	 * @return [Array]
	 */
	_get_seq([since, till]) {
		return Array.from({ length: till - since + 1 }, (_, i) => since + i);
	}

	/**
	 * Helper function to compact number series into list of
	 * subsequent ranges of numbers.
	 * i.e.
	 * [1,2,3,7,8,9] becomes [[1,3], [7,0]]
	 *
	 * @param      {number}  seq     The sequence
	 * @return     {Array}   { description_of_the_return_value }
	 */
	_compact_seq(seq) {
		// Щас начнётся
		var acc = [],
			prevN = seq[0],
			prevStart = seq[0];

		// свернём последовательности в список диапазонов !!
		seq.forEach((val, idx) => {
			if (prevN > val) throw 'Sequence is not sorted properly.';
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
		const [rangeS, rangeE] = range;

		if (!this.value.length || this.value[this.value.length - 1][1] < rangeS - 1) {

			/**
			 * List is empty or new Range is far enogh behind last value in the List,
			 * i.e. they don't contact each other
			 *
			 * @Example of contacted Ranges: [1,5] and [5,9], this Ranges
			 * must be joined to one range [1,9], see below
			 */
			this.value.push(range);
		} else {
			this.value = this.value.reduce((acc, subsect) => {
				const [currS, currE] = subsect;

				if (currE < rangeS - 1) {

					/**
					 * subsection locates before new range and don't contact to it,
					 * just save subrange
					 */
					acc.push(subsect);
				} else {
					const prevAdded = acc[acc.length - 1] || [0, 0];
					if (prevAdded[1] > rangeS) {
						// new Range overlaps the earlier checked range
						const isCurrentBehindRange = currS > rangeE + 1;
						// just correct earlier range
						acc[acc.length - 1][1] = isCurrentBehindRange ? rangeE : Math.max(currE, rangeE);
						// new Range is not overlaps the current, we need to add it
						if (isCurrentBehindRange) acc.push(subsect);
					} else {
						acc.push([Math.min(currS, rangeS), Math.max(currE, rangeE)]);
					}
				}

				return acc;
			}, []);
		}

		return this.value;
	}

	/**
	 * Removes a range from the list
	 */
	remove(range) {
		this.validate(range);

		if (
			!this.value.length || // subtract from empty list? really?
			this.value[0][0] > range[1] + 1 || // subtract ahead of list
			this.value[this.value.length - 1][1] < range[0] - 1 // subtract behind the list
		)
			return [];
		const [rangeS, rangeE] = range;

		this.value = this.value.reduce((acc, subsect) => {
			const [currS, currE] = subsect;

			if (currE < rangeS || currS > rangeE) {
				// current and punching Ranges are not overlaps, we just save the current
				acc.push(subsect);
			} else {
				const lastAdded = acc[acc.length - 1];
				if (currS < rangeS && currE > rangeE) {
					// punching Range brake this section to two
					acc.push([currS, rangeS], [rangeE, currS]);
				} else if (rangeS > currS || currE > rangeE) {
					// punching range not inside the current subrange, but cuts some slice
					// only one edge of cutting Range inside current subrange
					acc.push([Math.max(currS, rangeS), Math.min(currE, rangeE)]);
				}
				// punching Range covers current subrange, we haven't to do something
			}

			return acc;
		}, []);

		return this.value;
	}

	/**
	 * Returns the list of ranges as Array of Ranges
	 */
	get list() {
		return this.value;
	}

	/**
	 * Prints out the list of ranges
	 */
	print() {
		// eslint-disable-next-line no-console
		console.log(this.toString());
	}

	toString() {
		return this.value && this.value.length
			? JSON.stringify(this.value)
					.slice(1, -1)
					.replace(/\],\[/g, '] [')
					.replace(/(?<=\d), *(?=\d)/g, ', ')
			: '<NULL LIST OF RANGES>';
	}
};
