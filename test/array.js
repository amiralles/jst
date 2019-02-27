import { fixture, describe, it } from "/lib/jst.js"
// TODO: Doc how to use it.
// * Must run on webserver. (ie python -m SimpleHTTPServer)
// * One class/fixture per file.
// * Load scripts as "module" not "text/javascript".

// The API for this library is similar to mocha, but has way less features.
// The idea was to build the smallest possible testing library, to verify the 
// correct behavior for the data structures from DSFS (ES6 Edition) whitout 
// using Node's experimental features. (This is an in browser testing 
// library that supports ES6 features like import, export, and friends...)
fixture("Array", function() {
	describe("#new", function() {
		it("Should create an empty array.", function() {
			const arr = new Array();
			return arr.length === 0;
		});
		it("Intentional fail.", function() {
			// Expected failure.
		});
	});
	describe("#push", function() {
		it("Should add item to the array.", function() {
			const arr = new Array();
			arr.push("foo");
			return arr.length === 1;
		});
	});
});


