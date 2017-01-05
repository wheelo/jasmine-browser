//jasmine.createSpy() .toHaveBeenCalled()  .toHaveBeenCalledWith
;(function(window){
	var tests = [];
	var currentTest;
	var passed = 0;
	var failed = 0;

	function Test(name, callback) {
		this.name = name;
		this.callback = callback;
		this.failed = false;
	}

	Test.prototype.run = function(next) {
		var self = this;
		console.log(">> " + tests.indexOf(self) + ": "+ this.name);
		currentTest = this;
		if (hasParas(this.callback)) {
			this.callback(function() {
				self.failed ? failed++ : passed++;
				next();
			});
		} else {
			this.callback();
			this.failed ? failed++ : passed++;
			next();        
		}
	};

	function Expectation(value, test) {
		this.value = value;
		this.test = test;
	}

	Expectation.prototype.toBe = function(value) {
		if (this.value === value) {
			console.info("   [passed] Both values are", value);
		} else {
			this.test.failed = true;
			console.info("   [failed] Expected", this.value, "to be", value);
		} 
	};

	Expectation.prototype.toEqual = function(value) {
		if (equals(this.value, value)) {
			console.info("   [passed] Both values are", value);
		} else {
			this.test.failed = true;
			console.info("   [failed] Expected", this.value, "to equal", value);
		}
	};

	function hasParas(func) {
		var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
		var args = func.toString().match(FN_ARGS)[1];
		return !!args;
	}

	function equals(a, b) {
		function isObject(obj) {
			return ({}).toString.call(obj) == "[object Object]";
		}
		if (Array.isArray(a)) {
			if (!Array.isArray(b) || a.length !== b.length)
				return false;
			for (var i = 0; i < a.length; i++) {
				if (!equals(a[i], b[i])) {
					return false;
				}
			}
			return true;
		} else if (isObject(a)) {
			if (!isObject(b))	
				return false;
			for (var i in a) {
				if(a.hasOwnProperty(i)){
					if (!equals(a[i], b[i])) {
						return false;
					}
				}
			}
			return true;
		} else {
			return a === b;
		}
	}

	function run() {
		var index = 0;
		next();
		function next() {
			if (index === tests.length) {
				console.info("   In total: " + passed + " passed,", failed + " failed.");
			} else {
				tests[index++].run(next);
			}
		}
	}

	window.expect = function(value) {
		return new Expectation(value, currentTest);
	}

	window.describe = function(desc, its) {
		window.beforeEach = function(name, callback) {
			tests.unshift(new Test(desc + " " + name, callback));
		}
		window.it = function(name, callback) {
			tests.push(new Test(desc + " " + name, callback));
		}
		its();
		setTimeout(run, 0);
	}

})(window);


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

});