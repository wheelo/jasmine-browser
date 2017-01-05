# jasmine-browser

This is one tiny implementation of jasmine, which is runnable in the browser environment.  I develop this tiny toy 'framework' for fun and to show the possibility of running jasmine in browser with extreme short codes.


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
	
	/*
	it("createSpy", function() {
		//PubSub/Promise
		var watchFn = createSpy();

		expect(watchFn).toHaveBeenCalled();
		//expect(watchFn).toHaveBeenCalledWith(scope);
	});

	it('resolves promise at next digest', function() {
		var d = $q.defer();
		var promiseSpy = jasmine.createSpy();
		d.promise.then(promiseSpy);
		d.resolve(42);
		$rootScope.$apply();
		expect(promiseSpy).toHaveBeenCalledWith(42);
	});
	*/

});
```


## Features
This module is developed mostly for fun & exploration, which shows the possibility of running jasmine test in browser with the LOC under 100 lines. Now the features include: 

- basic support of `describe, expect & it`, just like jasmine. 
- support the asynchronous test.

More features, like `createSpy`, `toHaveBeenCalled` and `toHaveBeenCalledWith` is in development. And another brother module is in process too, `jasmine-node` the one which can test in node.js environment and use the node module  `process.nextTick` to pollyfill. Stay tuned. ~

