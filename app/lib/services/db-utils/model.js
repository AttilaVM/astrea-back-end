class Model {
	constructor(db) {
		this.db = db;
	}

	defineSample() {
		function model() {
			return this.db.define (
				"Sample"
				, {
					sampleName: {type: this.db.STRING}
				});

		}
	}
}

module.exports = Model;
