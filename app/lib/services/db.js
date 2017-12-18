const dict = require("../event-dict.js");

const Sequelize = require('sequelize');

const Model = require("./db-utils/model.js");
const dbUtils = require("./db-utils/core.js");

const dbManager = {
	registerDbManager(dbConf) {
		const sequelize = new Sequelize(
				dbConf.user
			, dbConf.id
			, dbConf.password
			, dbConf.opts);

		const sampleModel = sequelize.define('sample', {
			sampleName: {
				type: Sequelize.STRING
			}
		});

		sequelize
			.authenticate()
			.then((e) => dbUtils.start(sampleModel))
			.catch((err) => console.log(err));

	}
};

module.exports = dbManager;
