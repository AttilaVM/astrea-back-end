const fs = require("fs");
const path = require("path");

function printInfo(msg) {
	console.info(msg);
}

function prettyObjPrint(obj, indent) {
	indent = indent || 0;
		for (let prop in obj) {
			if(!obj.hasOwnProperty(prop))
				continue;
			let value = obj[prop];
			if (typeof(value) === "object")
				prettyObjPrint(value, indent++);
			let indentArr = [];
			for (var i = 1; i <= indent; i++) {
				indentArr.push("\t");
			}
			console.info(`${indentArr.join("")}${prop}: ${value}`);
		}
	}

const cliUtils = {
	readJson(packakgeJsonPath) {
		return new Promise((resolve, reject) => {
			fs.readFile(packakgeJsonPath, (err, bytes) => {
				if (err)
					reject(err);
				else if (bytes)
					resolve(JSON.parse(bytes.toString()));
			});
		});
	}
	, mergeOptions(cliArgs, config) {
		let overrideP = false;
		const overrideArr = [];
		for (let argFlag in cliArgs) {
			if(!cliArgs.hasOwnProperty(argFlag))
				continue;
			let argName = argFlag.replace(/^--/, "");
			if(config.hasOwnProperty(argName)) {
				const oldValue = config[argName];
				const newValue = cliArgs[argFlag];
				if (oldValue === newValue)
					continue;
				// Record override
				overrideP = true;
				overrideArr.push({
					argName: argName
					, flag: argFlag
					, oldValue: oldValue
					, newValue: newValue
				});
				config[argName] = newValue;
			}
		}
		// Override notification
		if (overrideP) {
			printInfo("Some configuration options have been overriden by CLI arguments:");
			for (let ocase of overrideArr) {
				printInfo(`\t${ocase.argName}:\t${ocase.oldValue}\t-->\t${ocase.newValue}`);
			}
			printInfo("\n");
		}
		return config;
	}


};

cliUtils.prettyObjPrint = prettyObjPrint;
cliUtils.printInfo = printInfo;

module.exports = cliUtils;
