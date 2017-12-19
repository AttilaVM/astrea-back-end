const dict = require("../../event-dict.js");

const path = require("path");

const fileUpload = require("express-fileupload");

const fileManager = {
	registerFileManager: function(opts) {
		const root = opts.root;
		eventDispatcher.addListener(
			dict.FILE_WRITE.id
			, (token, file, relPath) => {
				file.mv(path.join(root, relPath))
					.then(() =>
								eventDispatcher.fileWritten(true, token))
					.catch((err) =>
								 eventDispatcher.fileWritten(false, token)
					);
			});
	}
};

module.exports = fileManager;
