/**
 * @file
 * @author wheelo
 * Created by wheelo on 17/1/5.
 */


;(function(global){
	var tests = [];
	var currentTest;
	var passed = 0;
	var failed = 0;
	var currentDesc = '';

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
				if (failed) {
					window.jasmineBrowserErrorCallback && window.jasmineBrowserErrorCallback({
						failed: failed
					});
				} else {
					window.jasmineBrowserSuccessCallback && window.jasmineBrowserSuccessCallback({
						passed: passed
					});
				}

				console.info("   In total: " + passed + " passed,", failed + " failed.");
			} else {
				tests[index++].run(next);
			}
		}
	}

	global.expect = function(value) {
		return new Expectation(value, currentTest);
	}

	global.describe = function(desc, its) {
		currentDesc = desc;
		its();
	}

	global.beforeEach = function(name, callback) {
		tests.unshift(new Test(currentDesc + " " + name, callback));
	}

	global.it = function(name, callback) {
		tests.push(new Test(currentDesc + " " + name, callback));
	}
	
	setTimeout(run, 0);

	/*
	if (typeof require === 'function' && typeof module === 'object' && module && typeof exports === 'object' && exports) {
        module.exports = jasmine;
    }
    else if (typeof define === 'function' && define.amd) {
        define(function() { return (global.jasmine = jasmine) });
    }
    else {
        global.jasmine = jasmine;
    }
    */

	// todo增加Node的pollifill能力
	
})(window);



