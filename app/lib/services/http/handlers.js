"use strict";

const path = require("path");

const dict = require("../../event-dict.js");

const md5 = require("md5");

function getReport(res, originalToken, returnToken, data) {
	if(originalToken !== returnToken)
				return;
	eventDispatcher.removeListener(dict.DB_REPORT.id, getReport);
	console.log("DATA!:", data);

	res.send(JSON.stringify(data));
}

const handlers = {
	provideVoxelSample: function(req, res) {
		// validateRequest()
		// query()
	}
	, saveVoxelSample: function(req, res, httpRoot, samplePath, thumbPath) {
		const samplePathRel = path.join(httpRoot, samplePath);
		const thumbPathRel = path.join(httpRoot, thumbPath);
		// validateRequest()
		// validateSample()
		// save()
		console.log("save");
		if (!req.files) {
			return res.status(400).send("No files were uploaded.");
			eventDispatcher.msg(dict.MSG.WARNING, `Client on ${req.ip} has not uploaded any files`);
		}
		eventDispatcher.msg(5, req.files);
		const volImgFile = req.files.voxel_img;
		const thumbImgFile = req.files.thumb_img;
		const dataFile = req.files.app_data;

		let volWritePromise;
		let thumbWritePromise;
		let sampleImgPath;
		let thumbImgPath;
		if (samplePath && thumbPath) {
			sampleImgPath = path.join(samplePathRel, volImgFile.name);
			thumbImgPath = path.join(thumbPathRel, thumbImgFile.name);
			volWritePromise = volImgFile.mv(sampleImgPath);
			thumbWritePromise = thumbImgFile.mv(thumbImgPath);
		}
		const data = JSON.parse((dataFile.data.toString()));
		data.hash = md5(volImgFile.data);
		data.sampleImgPath = path.join(samplePath, volImgFile.name);
		data.thumbImgPath = path.join(thumbPath, thumbImgFile.name);

		Promise.all([volWritePromise, thumbWritePromise])
			.then(() => {
				eventDispatcher.upload(data);
				res.status(201).send("Data uploaded");
			})
			.catch((err) => {
				// TODO this should only be sent in debug mode
				eventDispatcher.msg(dict.MSG.CRITICAL, err);
				res.status(500).send("Internal server error");
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
