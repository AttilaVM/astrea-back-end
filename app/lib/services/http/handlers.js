"use strict";

const dict = require("../../event-dict.js");

const md5 = require("md5");

function getReport(res, originalToken, returnToken, data) {
	if(originalToken !== returnToken)
				return;
	eventDispatcher.removeListener(dict.DB_REPORT.id, getReport);
	console.log("DATA!:", data);

	res.send(data);
}

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
		const volImgFile = req.files.voxel_img;
		const thumbImgFile = req.files.thumb_img;
		const dataFile = req.files.app_data;
		const volWritePromise = volImgFile.mv("./data/volume/" + volImgFile.name);
		const thumbWritePromise = thumbImgFile.mv("./data/thumb/" + volImgFile.name);
		const data = JSON.parse((dataFile.data.toString()));

		data.hash = md5(volImgFile.data);
		console.log(data.hash.length);

		Promise.all([volWritePromise, thumbWritePromise])
			.then(() => {
				eventDispatcher.upload(data);
				res.send("Data uploaded");
			});

	}

	, downloadData(req, res) {
		const token = Symbol();

		eventDispatcher.addListener(
			dict.DB_REPORT.id
			, getReport.bind(this, res, token));


		eventDispatcher.queryAll(token);


	}
};

	module.exports =  handlers;
