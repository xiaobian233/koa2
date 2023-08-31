const jwt = require('jsonwebtoken')
module.exports = (...args) => {
	return new Promise((resolve, reject) => {
		jwt.verify(...args, (error, decoded) => {
			console.error(error, decoded, 'verify')
			error ? reject(error) : resolve(decoded)
		})
	})
}
