const events = require('events');
const dict = require("./event-dict.js");

class EventDispatcher extends events.EventEmitter {
	constructor() {
		super();
	}

	msg(priority, msg) {
		this.emit(dict.MSG.id ,priority, msg);
	}

	dataBaseState(state) {
		this.emit(dict.DATABASE_STATE.id, dict.DATABASE_STATE.START);
	}

	upload(data) {
		console.log(data);
		this.emit(dict.UPLOAD.id, data);
	}

	queryAll(token) {
		this.emit(dict.QUERY_ALL.id, token);
	}

	dbReport(token, data) {
		this.emit(dict.DB_REPORT.id, token, data);
	}

	fileWrite(token, blob, fileName) {
		this.emit(dict.FILE_WRITE, blob, fileName);
	}

	fileWritten(success, token) {
		this.emit(dict.FILE_WRITTEN, success, token);
	}
}

module.exports = EventDispatcher;
