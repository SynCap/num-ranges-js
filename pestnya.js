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

	bBLK: 40,
	bRED: 41,
	bGRN: 42,
	bYLW: 43,
	bBLU: 44,
	bMGT: 45,
	bCYN: 46,
	bWHT: 47
};

/* eslint-disable no-console */
module.exports = function(acn, obj, sbj, smp) {
	console.log(`${pfx}7;${acn ? clr.fGRN : clr.fRED}m`);
	console.log(` ${obj} `, ` ${pfx}${clr.RST};${clr.fYLW};${clr.bBLK}m${sbj}`, `${pfx}${clr.RST}m`);
	console.log(`${pfx}1;${clr.fCYN}m${smp}${pfx}${clr.RST}m`);
};
