# jasmine-browser

This is one tiny implementation of jasmine, which is runnable in the browser environment. I create this tiny rudimentary 'jasmine framework' basically for fun and to have a jasmine runnable in browser with the minimum codes that I can write.


## Usage
By now, you should, however, only deploy it under the browser environment(for the name) and might refer to your old friend **JavaScript DevTools Console**(*i.e.*, F12 in some browsers) to observe the resulting record.


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
This module is orginally coded for fun & exploration, hence the features are quite limited. The current features only include: 

- basic support of `describe`, `expect` & `it`, just like jasmine. 
- support the asynchronous test.


While I have not sketched out the other APIs akin to original 'jasmine' at a higher level yet, you should be awared that they actually exsit and will be soon brought together in next version. What the current state of codes stands out is merely an attempt to illuminate some basic details of implementing some tiny but runnable variant of jasmine. I try to not go any futher beyond the basic mocking features jasmine provided, those advanced features like `createSpy`, `toHaveBeenCalled` and `toHaveBeenCalledWith` are just not available in current version and all left to the next release. 

One last aside, there is even another brother module I am working on, namely `jasmine-node`, this ongoing module is able to perform jasmine test in node.js with a silimar implementation of this 'jasmine-browser'(hint: it uses the node `process.nextTick` for a pollyfill). 

There is no supports of gulp, browserify and webpack in current version, but I think they will all come out in future version(believe me). For now, suffice it to enjoy the poor interfaces I've just implemented. 

Stay tuned~

