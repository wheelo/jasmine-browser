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