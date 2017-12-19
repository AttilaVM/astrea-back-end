const eventDict = {
	MSG: {
		id: 0
		, CRITICAL: 1
		, ERROR: 2
		, WARNING: 3
		, NOTIFICATiON: 4
		, DEBUG: 5
	}
	, DATABASE_STATE: {
		id: 1
		, START: 0
	}
	, UPLOAD: { id: 2 }
	, QUERY_ALL: { id: 3}
	, DB_REPORT: { id: 4}
	, FILE_WRITE: { id: 5 }
	, FILE_WRITTEN: { id: 6 }
};

module.exports = eventDict;
