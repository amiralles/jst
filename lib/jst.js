
(function() {
	this.rootNode = $("root");
})();

function $(id) {
	return document.getElementById(id);
}

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

function createH1(name) {
	const h1 = document.createElement("h2");
	h1.innerText = name;
	return h1;
}

function createH3(name) {
	const h3 = document.createElement("h3");
	h3.innerText = name;
	return h3;
}

function createDiv(content) {
	const div = document.createElement("div");
	if (content)
		div.innerText = content;
	return div;
}

function createList() {
	return document.createElement("ul");
}

function createListItem(text) {
	const li = document.createElement("li");
	li.innerText = text;
	return li;
}

function printFixture(name) {
	const nd = createDiv();
	const h1 = createH1(name);
	nd.appendChild(h1);
	this.currNode = this.rootNode;
	this.currNode.appendChild(nd);
	this.fixNode = nd;
	return nd;
}

function printFunc(name) {
	const d   = createDiv();
	const nd  = createH3(name);
	const lst = createList();
	d.appendChild(nd);
	d.appendChild(lst);
	this.fixNode.appendChild(d);
	this.currNode = lst;
	return d;
}

function printPass(desc) {
	const nd = createListItem(`${desc} [PASS]`);
	nd.classList.add("pass");
	this.currNode.appendChild(nd);
}

function printFail(desc) {
	const nd = createListItem(`${desc} [FAIL]`);
	nd.classList.add("fail");
	this.currNode.appendChild(nd);
}

// This function is used to describe the behavior of a class or component.
function fixture(name, fn) {
	let nd = printFixture(name);
	this.descs = new Array(); // <- Tests descriptions.
	fn();                     // <- Builds and runs the current fixture.

	let pass = 0;
	let fail = 0;
	for (d of this.descs) {
		this.currNode = nd;
		nd = printFunc(d.name);
		for (a of d.asserts) {
			if (a.pass) {
				pass += 1;
				printPass(a.desc);
			}
			else {
				fail += 1;
				printFail(a.desc);
			}
		}
	}
	/*
	log("===");
	log("STATS");
	log(`${pass} tests passed, ${fail} tests failed.`);
	log("===");
	*/
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




