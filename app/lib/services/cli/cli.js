const dict = require("../../event-dict.js");

const cli = {
	registerCli(debug, verbosity) {
		if (debug)
			verbosity = 4;
		eventDispatcher.addListener(
			dict.MSG.id
			, (priority, msg) => {
				if (priority <= verbosity) {
					if (priority >= 4)
						console.info(msg, "\n");
					else if (priority === 3)
						console.warn(msg, "\n");
					else
						console.error(msg, "\n");
				}
			}
		);
	}
};

module.exports = cli;
