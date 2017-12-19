const dict = require("../../event-dict.js");

const express = require("express");

// middlewares
const logger = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const handlers = require("./handlers.js");


const webserver = {
	registerWebServer(opts) {
		const app = express();
		// Activate middlewares
		app.use(express.static(opts.root));
		app.use(fileUpload());
		app.use(bodyParser.json());
		if (opts.debug)
			app.use(logger("dev"));
		// Actions
		app.get("/data", handlers.downloadData);
		app.post("*", handlers.saveVoxelSample);

		eventDispatcher.addListener(
			dict.DATABASE_STATE.id
			, (state) => {
				if (state === dict.DATABASE_STATE.START) {
					app.listen(opts.port, (e) => {
						eventDispatcher.msg(dict.MSG.NOTIFICATiON, `Listening on ${opts.port}`);
					});
				}
			});

	}
};

module.exports = webserver;
