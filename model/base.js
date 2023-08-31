class Base {
	constructor(data, code, message) {
		this.code = code || 200
		this.data = data || null
		this.message = message || null
	}
}

module.exports = Base
