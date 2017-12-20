const dict = require("../../event-dict.js");

const Sequelize = require('sequelize');

const Model = require("./model.js");
const dbUtils = require("./core.js");

const dbManager = {
	registerDbManager(dbConf) {
		const sequelize = new Sequelize(
				dbConf.user
			, dbConf.id
			, dbConf.password
			, dbConf.opts);

		const sampleModel = sequelize.define('sample', {
			sampleName: {type: Sequelize.STRING}
			// a md5 hash has 32 hexdigits
			, hash: {type: Sequelize.STRING(32) }
			, sampleImgPath: { type: Sequelize.STRING()}
			, thumbImgPath: { type: Sequelize.STRING()}
			, zScaler: {type: Sequelize.FLOAT}
			, ambient: {type: Sequelize.FLOAT}
			, interpolation: {type: Sequelize.STRING}
		});

		sequelize
			.authenticate()
			.then((e) => {
				dbUtils.start(sampleModel);
				dbUtils.reporter(sampleModel);
			})
			.catch((err) => console.log(err));

	}
};

module.exports = dbManager;
