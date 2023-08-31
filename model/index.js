const Base = require('./base')

class Success extends Base {
	constructor(data, code = 200, message = null) {
		super(data, code, message)
	}
}

class Error extends Base {
	constructor(message, code = 502, data = null) {
		super(data, code, message)
	}
}

module.exports = {
	Success,
	Error,
	Res: Success,
	Rej: Error,
}
