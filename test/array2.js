import {fixture, describe, it} from "/lib/jst.js"

fixture("Array II", function() {
	describe("#new II", function() {
		it("Should create another empty array.", function() {
			const arr = new Array();
			return arr.length === 0;
		});
		it("Should fail.", function() {
			// Expected failure.
		});
	});
});
