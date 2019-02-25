function log(msg) {
	console.log(msg);
}

function push(st, desc) {
	if (!st)
		throw "Internal Error. The 'st' argument is required.";
	st.push(desc);
}

function peek() {
	// Returns undefined when there is no descs or when descs's length 
	// produces an out of index.
	return this.descs ? this.descs[this.descs.length - 1] : undefined;
}

// This function is used to describe the behavior of a class or component.
function fixture(name, fn) {
	log(name);
	this.descs = new Array(); // <- Tests descriptions.
	fn();                     // <- Builds and runs the current fixture.

	let pass = 0;
	let fail = 0;
	for (d of this.descs) {
		log(`-- ${d.name}`);
		for (a of d.asserts) {
			if (a.pass) {
				pass += 1;
				console.log(`---- ${a.desc} PASS`);
			}
			else {
				fail += 1;
				console.log(`---- ${a.desc} FAIL`);
			}
		}
	}
	log("===");
	log("STATS");
	log(`${pass} tests passed, ${fail} tests failed.`);
	log("===");
}

// This function is used to describe the behavior of a function for
// the current class/component.
function describe(name, fn) {
	push(this.descs, { 
		name:    name, 
		asserts: new Array(),
	});
	fn();
}

// This function is used to describe a use case for the current function.
function it(desc, fn) {
	const d = peek(this.descs);
	if (!d) {
		throw "Internal Error. Bogus stack.";
	}

	const a = {
		desc: desc,
		pass: fn(),
	}

	d.asserts.push(a);
}

// The API for this library is similar to mocha, but has way less features.
// The idea was to build the smallest possible testing library, to verify the 
// correct behavior for the data structures from DSFS (ES6 Edition) whitout 
// using Node's experimental features. (This is an in browser testing 
// library that supports ES6 features like import, export, and friends...)
fixture("array", function() {
	describe("#new", function() {
		it("Should create an empty array.", function() {
			const arr = new Array();
			return arr.length === 0;
		});
		it("Should fail... :(", function() {
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




