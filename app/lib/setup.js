const dict = require("./event-dict.js");
const path = require("path");
const fs = require("fs");

const mkdirp = require("mkdirp");

function createDirPath(root, relpath) {
	return new Promise((resolve, reject) => {
		const targetPath = path.join(root, relpath);
		fs.access(targetPath, fs.constants.F_OK, (err) => {
			//  Resolve if pass is accessible
			if (!err)
				resolve(relpath);
			// else create the directory chain
			else {
				mkdirp(targetPath, (err) => {
					if (err) {
						reject(err);
						eventDispatcher.msg(dict.MSG.CRITICAL, `Failed to create chain of directories ${targetPath}`);
					}
					else {
						eventDispatcher.msg(dict.MSG.NOTIFICATiON, `Created directory chain ${targetPath}`);
						resolve(relpath);
					}
				});
			}
		});
	});
}

function setup(webserverOpts, fileManagerOpts) {
	const httpRoot = webserverOpts.root;
	const fileManagerRoot = fileManagerOpts.root;

	const sampleDir = path.join(fileManagerRoot, fileManagerOpts.sampleDir);
	const thumbDir = path.join(fileManagerRoot, fileManagerOpts.thumbDir);

	const sampleProm = createDirPath(httpRoot, sampleDir);
	const thumbProm = createDirPath(httpRoot, thumbDir);

	return Promise.all([sampleProm, thumbProm]);
}


module.exports = setup;
