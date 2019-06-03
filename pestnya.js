/* eslint-disable multiline-ternary */
/* eslint-disable no-console */
/* eslint-disable sort-keys */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
const pfx = '\x1b[';
const clr = {
	RST: 0,
	blink: 5,
	bright: 1,
	dim: 2,
	hidden: 8,
	reverse: 7,
	under: 4,

	fBLK: 30,
	fRED: 31,
	fGRN: 32,
	fYLW: 33,
	fBLU: 34,
	fMGT: 35,
	fCYN: 36,
	fWHT: 37,
	// eslint-disable-next-line no-trailing-spaces

	bBLK: 40,
	bRED: 41,
	bGRN: 42,
	bYLW: 43,
	bBLU: 44,
	bMGT: 45,
	bCYN: 46,
	bWHT: 47
};
/* eslint-enable key-spacing */

// eslint-disable-next-line func-names
module.exports = function(acn, obj, sbj) {
	console.log(`${pfx}${acn ? clr.fCYN : clr.fRED}m`);
	console.log(obj, `${pfx}${clr.fYLW}m`, sbj, `${pfx}${clr.RST}m`);
};
