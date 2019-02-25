# jst
A tiny browser-based testing library for JavaScript.


## How to use it
The interface for **jst** was loosely based on mocha's API but it has a bare
minimum feature set. It's not a replacement for a fully fledged testing
frameworks; it's just a small library to do basic testing without worring about
dependencies or downloading half of the internet to run a couple of assertions.  


```js
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



```
