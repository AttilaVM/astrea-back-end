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
}

module.exports = EventDispatcher;
