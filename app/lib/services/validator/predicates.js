const predicates = {
	isBool: function (v) {
		return function(v) {
			const type = typeof(v);
			if (type === "boolean")
				return true;
			else
				return `should be a boolean instead of ${type}`;
		};
	}
	, isNumber: function () {
		return function(v) {
			const type = typeof(v);
		if (type === "number")
			return true;
		else
			return `should be a number instead of ${type}`;
		};
	}
	, isString: function () {
		return function(v) {
			const type = typeof(v);
		if (type === "string")
			return true;
		else
			return `should be a string instead of ${type}`;
		};
	}
	, isObject: function () {
		return function(v) {
			const type = typeof(v);
		if (type === "string")
			return true;
		else
			return `should be an object instead of ${type}`;
		};
	}
	, lesserEqual: function(limit) {
		return function(v) {
		if (v <= limit)
			return true;
		else
			return `should be less or equal than ${limit} instead of ${v}`;
		};
	}
	, greaterEqual: function (limit) {
		return function(v){
		if (v >= limit)
			return true;
			else
				return `should be greater or equal than ${limit} instead of ${v}`;
		};
	}
	, holds: function (values) {
		if (!Array.isArray(values))
			throw("holds predicate only accepts arrays");

		return function(v) {
			for (let value of values) {
				if (v === value)
					return true;
			}
			return `should hold any of these: ${values}, instead of ${v}`;
		};
	}
};

module.exports = predicates;
