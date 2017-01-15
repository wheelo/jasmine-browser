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


While I have not sketched out the other API akin to original 'jasmine' at a higher level yet, you should be awared that they actually exsit and if possible will be brought out in the near future. What the current codes I write here are pieces of demonstration of showing how short and runable codes I could write for one coarse mimic of jasmine(So bear me for a while). Features like `createSpy`, `toHaveBeenCalled` and `toHaveBeenCalledWith` will be packed as one version to be released afterwards. 

One last aside, there is even another brother module I am working on, namely `jasmine-node`, this ongoing module is able to perform jasmine test in node.js with a silimar implementation of this 'jasmine-browser'(PS: hint, it uses the node `process.nextTick` for a pollyfill). 

Finally, There are no supports of gulp, webpack or browserify either right now, but they will also be brought out soon, definetely not long afterwards. For now, suffice it to merely enjoy the poor interface I have implemented. 

Stay tuned~

