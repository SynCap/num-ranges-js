const Ranges = require("../ranges");
const expect = require("chai").expect;

const r = new Ranges();

describe("Ranges", () => {
    it("Adds first range [1, 4] and should show the [1, 4]", () => {
        r.add([1, 4]);
        expect(r.toString()).to.equal("[1, 4]");
    });

    it("Adds range [10, 20] and should show the [1, 4] [10, 20]", () => {
        r.add([10, 20]);
        expect(r.toString()).to.equal("[1, 4] [10, 20]");
    });

    it("Adds range [10, 10] and should show the [1, 4] [10, 20]", () => {
        r.add([10, 10]);
        expect(r.toString()).to.equal("[1, 4] [10, 20]");
    });

    it("Adds range [21, 21] and should show the [1, 4] [10, 21]", () => {
        r.add([21, 21]);
        expect(r.toString()).to.equal("[1, 4] [10, 21]");
    });

    it("Adds range [3, 8] and should show the [1, 8] [10, 21]", () => {
        r.add([3, 8]);
        expect(r.toString()).to.equal("[1, 8] [10, 21]");
    });

    it("Remove range [10, 10] and should show the [1, 8] [11, 21]", () => {
        r.remove([10, 10]);
        expect(r.toString()).to.equal("[1, 8] [11, 21]");
    });

    it("Remove range [10, 11] and should show the [1, 8] [12, 21]", () => {
        r.remove([10, 11]);
        expect(r.toString()).to.equal("[1, 8] [12, 21]");
    });

    it("Remove range [15, 17] and should show the [1, 8] [12, 14] [18, 21]", () => {
        r.remove([15, 17]);
        expect(r.toString()).to.equal("[1, 8] [12, 14] [18, 21]");
    });

    it("Remove range [3, 19] and should show the [1, 2] [20, 21]", () => {
        r.remove([3, 19]);
        expect(r.toString()).to.equal("[1, 2] [20, 21]");
    });
});