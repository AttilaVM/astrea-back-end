const express = require("express");

// middlewares
const logger = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const cliUtils = require("./lib/utils/cli.js");
const handlers = require("./lib/handlers.js");


const app = express();

module.exports = function astrea(opts, appData) {
	if (opts.debug) {
		cliUtils.printInfo("Astrea options:");
		cliUtils.prettyObjPrint(opts, 1);
		cliUtils.printInfo("\n");
	}
	// Activate middlewares
	app.use(express.static(opts.root));
	app.use(fileUpload());
	app.use(bodyParser.json());
	if (opts.debug)
		app.use(logger("dev"));

	// Actions
	app.post("*", handlers.saveVoxelSample);

	app.listen(opts.port, (e) => {
		cliUtils.printInfo(`Listening on ${opts.port}`);
});
};
