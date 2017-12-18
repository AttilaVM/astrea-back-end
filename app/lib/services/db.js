const dict = require("../event-dict.js");

const Sequelize = require('sequelize');

const dbManager = {
	registerDbManager(dbConf) {
		const sequelize = new Sequelize(
		dbConf.user
		, dbConf.id
		, dbConf.password
		, dbConf.opts);

	sequelize.authenticate()
			.then(() => {
				eventDispatcher.msg(
					dict.MSG.NOTIFICATiON ,"Database connection is ready");
				eventDispatcher.dataBaseState(dict.DATABASE_STATE.START);
			})
		.catch((err) => console.log(err));
	}
};

module.exports = dbManager;
