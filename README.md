# jasmine-browser

This is one tiny implementation of jasmine, which is runnable in the browser environment.  I create this tiny toy 'framework' for fun and to have a jasmine runnable in browser with the shortest codes that I can write.


## Usage
By now, you should use it in the browser environment. And to observe the resulting test record, you should use the browser F12 comandline tool.


```js
describe("Testing", function() {
	var share;
	
	beforeEach("BeforeEach: Sharing Value", function() {
		share = 18;
		expect(share).toBe(0);
	});

	it("the first: Synchronousity", function() {
		var num = 1;
		expect(share++).toBe(18);
		expect(num).toBe(1);
	});

	it("the second: Asynchronousity", function(done) {
		var called = false;
		setTimeout(function() {
			called = true;
			expect(share).toBe(18);
			expect(called).toBe(false);
			done();
		}, 0);
		expect(called).toBe(false);
	});

	it("the third: Object", function() {
		var arr = {a:1, b:2};
		expect(arr).toEqual({a:1, b:3, c:5});
	});
	

	// createSpy & toHaveBeenCalledWith is in development

});
```


## Features
This module is developed mostly for fun & exploration, hence the features will be pretty simple. Now the features include: 

- basic support of `describe`, `expect` & `it`, just like jasmine. 
- support the asynchronous test.

More features, like `createSpy`, `toHaveBeenCalled` and `toHaveBeenCalledWith` is on the way. And another brother module is scheduling to release soon as well, i.e, `jasmine-node`, the one which can test in node.js environment which will use the node module  `process.nextTick` for a pollyfill. 

Stay tuned. ~

