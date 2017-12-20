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
										, hash: data.hash
										, sampleImgPath: data.sampleImgPath
										, thumbImgPath: data.thumbImgPath
										, xScale: data.voxelDimensions[0]
										, yScale: data.voxelDimensions[1]
										, zScale: data.voxelDimensions[2]
										, zScaler: data.zScaler
										, ambient: data.ambient
										, interpolation: data.interpolation
									});
								});
						}
					 );
	}

	, reporter(sampleModel) {
		eventDispatcher.addListener(
			dict.QUERY_ALL.id
			, (token) => {
				sampleModel.findAll()
					.then((data) => {
						eventDispatcher.dbReport(token, data);
					});
			}
		);
	}
};

module.exports = dbUtils;
