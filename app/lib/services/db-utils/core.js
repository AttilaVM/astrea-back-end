const Model = require("./model.js");
const dict = require("../../event-dict.js");
const Sequelize = require('sequelize');

const dbUtils = {
	start(sampleModel) {
		eventDispatcher.msg(
			dict.MSG.NOTIFICATiON ,"Database connection is ready");
		eventDispatcher.dataBaseState(dict.DATABASE_STATE.START);

		sampleModel.sync({force: true})
			.then(() =>
						{
							eventDispatcher.addListener(
								dict.UPLOAD.id
								,(data) => {
									sampleModel.create({
										sampleName: data.sampleName
									});
								});
						}
					 );



	}
};

module.exports = dbUtils;
