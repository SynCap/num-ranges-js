/**
 * Numeric ranges list manipulation class
 *
 * @license ICS
 * @author Constantin Losk, www.closk.design
 *
 *
 * @method add      ( <Range> ): [Array] add Range to list and interssect it with existing
 * @method remove   ( <Range> ): [Array] exclude Range from the list, and "punch" ranges if needed
 * @method print    ( none    ): [Array] print stirng representation of list to the console
 * @method toString ( none    ): [String] convert range list to
 * @method validate ( <Range> ): [Boolean] validate Range to be correct for
 *                               further use. Returns `true` on success, or throw exceptions othervise
 *
 * @property list : [Array] return whole list of ranges
 *
 * @inner _compact_seq ( <Array> ): [Array[Array]] convert joined sequencies of Numbers into List of Ranges
 * @inner _get_seq     ( <Range> ): [Array]	expands Range to array of Numbers that Range represents
 *
 * @Example of a Range      [1, 4] - includes integers: 1, 2, 3, and 4.
 * @Example of a Range List [1, 4], [109, 206], [400, 600]
 */

module.exports = class Ranges {
	constructor(value) {
		if (value && !Array.isArray(value))
			throw "Initial value must be Array of ranges -- 2 digit length arrays";

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
	 * Короче, полная победа опыта над разумом: нах математику, нах логику,
	 * бум шпилить на алгоритмах!!
	 * Однако, такой подход не лишён толики разумного: все манипуляции
	 * делаются на оптимизированных внтри движков методах работы с данными.
	 * Так что, еще вопрос -- будет ли проверка диапазонов на чистой логике
	 * более производительна, чем этот Брут-фАрс
	 *
	 * Совершенно не удивлюсь, что содержимое 2х методов с подчёркиваним в
	 * названиях, разсползуться по интернету в милионах копипастов, а в репе
	 * будут торчать парочка звёздочек от коллег по опасному бизнесу.
	 *
	 * P.S. таки да, я специально выбрал самую короткую функцию, поставил её
	 * пониже в файле, чтобы накатать самый длинный и бесполезный комментарий
	 * на весь реп.
	 *
	 * P.P.S. И, йопт, ДА, я специально написал его по-русски!!! Гугла-Транслятор
	 * в помощь!
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
	 * [1,2,3, 7,8,9] becomes [[1,3], [7,0]]
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
			if (prevN > val) throw "Sequence is not sorted properly.";
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

		return (this.value = this._compact_seq(new Uint32Array(tmpSet).sort()));
	}

	/**
	 * Removes a range from the list
	 */
	remove(range) {
		this.validate(range);
		var tmpSet = new Set();
		this.value.forEach(subrange => {
			tmpSet = new Set([...tmpSet, ...this._get_seq(subrange)]);
		});

		return (this.value = this._compact_seq(
			new Uint32Array(tmpSet).filter(x => x < range[0] || x > range[1])
		));
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
					.replace(/\],\[/g, "] [")
					.replace(/(?<=\d), *(?=\d)/g, ", ")
			: "<NULL LIST OF RANGES>";
	}
};
