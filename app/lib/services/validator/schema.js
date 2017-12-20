const p = require("./predicates.js");
const o = require("./operators.js");

const schema = {
		debug: [o.OPTIONAL, p.isBool()]
	, verbosity: [o.OPTIONAL ,p.isNumber(), p.lesserEqual(5), p.greaterEqual(0)]

	, webserver: {
			port: [p.isNumber(), p.greaterEqual(0), p.lesserEqual(65535)]
		, root: [p.isString()]
	}

	, db: {
			user: [p.isString()]
		, id: [p.isString()]
		, password: [p.isString()]
		, opts: {
				dialect: [p.isString(), p.holds(["postgres"])]
			, host: [p.isString()]
			, pool: {
					max: [p.isNumber(), p.greaterEqual(1)]
				, min: [p.isNumber(), p.greaterEqual(1)]
				, acquire: [p.isNumber(), p.greaterEqual(1)]
				, idle: [p.isNumber(), p.greaterEqual(1)]
			}

		}
	}

	, fileManager: {
			type: [p.isString(), p.holds(["local"])]
		, root: [p.isString()]
	}
};

module.exports = schema;
