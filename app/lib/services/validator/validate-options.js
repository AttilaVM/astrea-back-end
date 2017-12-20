function validateOptions(schema, data, errorBuffer, parents) {
	errorBuffer = errorBuffer || [];
	parents = parents || [];
	// Walk through schema predicates
	for (let itemName in schema) {
		if (!schema.hasOwnProperty(itemName))
			continue;
		let predArr = schema[itemName];
		// Data must hold value under itemName, unless it made optional by an operator.
		if (  !data.hasOwnProperty(itemName)
					&& predArr[0] !== o.OPTIONAL) {
			errorBuffer.push(`${itemName} is missing`);
			continue;
		}
		let itemValue = data[itemName];
		// predicates variable is not an array that means
		// it contain nested predicates
		if (!Array.isArray(predArr) && typeof(predArr) === "object") {
			if (typeof(itemValue) !== "object") {
				errorBuffer.push(`${itemName} should be an Object (map of options)`);
				continue;
			}
			else {
				// recursivly call function to nested options
				errorBuffer.concat(validateOptions(predArr, itemValue, errorBuffer, parents.concat([itemName])));
				continue;
			}
		}
		// Testing predicates
		for (let predicate of predArr) {
			// omit operators
			if (typeof(predicate) !== "function")
				continue;

			const result = predicate(itemValue);
			if (result && typeof(result) === "boolean")
				continue;
			else {
				let parentChain = "";
				for (let parent of parents)
					parentChain = parentChain + parent + " :: ";
				errorBuffer.push(`${parentChain}${itemName}: ${result}`);
			}
		}
	}
	return errorBuffer;
}

module.exports = validateOptions;
