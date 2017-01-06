# jasmine-browser

This is one tiny implementation of jasmine, which is runnable in the browser environment. I create this tiny toy 'framework' basically for fun and to have a jasmine runnable in browser with the shortest codes that I can write.




## Usage
By now, you should only deploy it in browser environment(for the name) and might refer to your old friend **JavaScript DevTools Console**(*i.e.*, F12 in some browsers) to observe the resulting record.


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
This module is developed basically for fun & exploration, hence the features is quite simple initially, but it will be improved in the future. The current features include: 

- basic support of `describe`, `expect` & `it`, just like jasmine. 
- support the asynchronous test.

More features, like `createSpy`, `toHaveBeenCalled` and `toHaveBeenCalledWith` is on the way. There is no support of gulp, webpack or browserify yet right now, but still they are on schedule. One more thing, another brother module is about coding on schedule, *i.e.*, `jasmine-node`, the one which can test in node.js environment which will use the node module  `process.nextTick` for a pollyfill. 

Stay tuned. ~

