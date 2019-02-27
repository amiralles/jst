let rootNode, fixNode, currNode, descs;

export { fixture, describe, it }

(function() {
	rootNode = $("root");
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
	return descs ? descs[descs.length - 1] : undefined;
}

function createHeader(name) {
	const h1 = document.createElement("h2");
	h1.innerText = name;
	return h1;
}

function createSubHeader(name) {
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
	const h1 = createHeader(name);
	nd.appendChild(h1);
	currNode = rootNode;
	currNode.appendChild(nd);
	fixNode = nd;
	return nd;
}

function printFunc(name) {
	const d   = createDiv();
	const nd  = createSubHeader(name);
	const lst = createList();
	d.appendChild(nd);
	d.appendChild(lst);
	fixNode.appendChild(d);
	currNode = lst;
	return d;
}

function printPass(desc) {
	const nd = createListItem(`${desc} [PASS]`);
	nd.classList.add("pass");
	currNode.appendChild(nd);
}

function printFail(desc) {
	const nd = createListItem(`${desc} [FAIL]`);
	nd.classList.add("fail");
	currNode.appendChild(nd);
}

// This function is used to describe the behavior of a class or component.
function fixture(name, fn) {
	let nd = printFixture(name);
	descs = new Array(); // <- Tests descriptions.
	fn();                     // <- Builds and runs the current fixture.

	let pass = 0;
	let fail = 0;
	for (let d of descs) {
		currNode = nd;
		nd = printFunc(d.name);
		for (let a of d.asserts) {
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
	push(descs, { 
		name:    name, 
		asserts: new Array(),
	});
	fn();
}

// This function is used to describe a use case for the current function.
function it(desc, fn) {
	const d = peek(descs);
	if (!d) {
		throw "Internal Error. Bogus stack.";
	}

	const a = {
		desc: desc,
		pass: fn(),
	}

	d.asserts.push(a);
}


