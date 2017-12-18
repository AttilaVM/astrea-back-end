const EventDispatcher = require("./lib/event-dispatcher.js");
const cliUtils = require("./lib/utils/cli.js");

const dbManager = require("./lib/services/db.js");
const webserver = require("./lib/services/webserver.js");
const cli = require("./lib/services/cli.js");

module.exports = function astrea(opts, appData) {
	global.eventDispatcher = new EventDispatcher();
	cli.registerCli(opts.debug, opts.verbosity);
	if (opts.debug) {
		cliUtils.printInfo("Astrea options:");
		cliUtils.prettyObjPrint(opts, 1);
		cliUtils.printInfo("\n");
	}

	dbManager.registerDbManager(opts.db);
	webserver.registerWebServer(opts.webserver);

};
