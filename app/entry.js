const dict = require("./lib/event-dict.js");

const EventDispatcher = require("./lib/event-dispatcher.js");
const cliUtils = require("./lib/services/cli/utils.js");

const validateOptions = require("./lib/services/validator/validate-options.js");
const schema = require("./lib/services/validator/schema.js");

const setup = require("./lib/setup.js");
const dbManager = require("./lib/services/db/db.js");
const webserver = require("./lib/services/http/http.js");
const cli = require("./lib/services/cli/cli.js");

module.exports = function astrea(opts, appData) {
	global.eventDispatcher = new EventDispatcher();
	cli.registerCli(opts.debug, opts.verbosity);
	if (opts.debug) {
		cliUtils.printInfo("Astrea options:");
		cliUtils.prettyObjPrint(opts, 1);
		cliUtils.printInfo("\n");
	}

	const errorBuffer = validateOptions(schema, opts);
	if (errorBuffer.length > 0) {
		for (let errorStr of errorBuffer)
			console.error(errorStr);
		throw("Invalid configuration");
	}

	setup(opts.webserver, opts.fileManager)
		.then((paths) => {
			const [samplePath, thumbPath] = paths;
			console.log(paths);
			dbManager.registerDbManager(opts.db);
			webserver.registerWebServer(opts.webserver, samplePath, thumbPath);
		})
		.catch((err) => {
			console.error(err);
			eventDispatcher.msg(dict.MSG.CRITICAL, `Astrea failed at Setup phase. Reason: ${err}`);
		});
};
