const EventDispatcher = require("./lib/event-dispatcher.js");
const cliUtils = require("./lib/services/cli/utils.js");

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

	dbManager.registerDbManager(opts.db);
	webserver.registerWebServer(opts.webserver);

};
