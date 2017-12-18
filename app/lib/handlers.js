"use strict";

const dict = require("./event-dict.js");

const handlers = {
	provideVoxelSample: function(req, res) {
		// validateRequest()
		// query()
	}
	, saveVoxelSample: function(req, res) {
		// validateRequest()
		// validateSample()
		// save()
		console.log("save");
		if (!req.files)
			return res.status(400).send("No files were uploaded.");
		console.log(req.files);

		const imgFile = req.files.voxel_img;
		const dataFile = req.files.app_data;
		const imgWritePromise = imgFile.mv("./" + imgFile.name);
		const data = JSON.parse((dataFile.data.toString()));

		eventDispatcher.upload(data);

		imgWritePromise
			.then(() => res.send("Data uploaded"));

	}
};

module.exports =  handlers	;
