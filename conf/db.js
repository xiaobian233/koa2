const env = process.env.NODE_ENV
let MYSQL_CONF = null
let AUTHORIZATION = {
	jwtSecret: 'jwtSecret',
	tokenExpiresTime: 60 * 60 * 12, // 60分钟
}
const MYSQL_CONFFN = () => {
	if (env == 'dev') {
		MYSQL_CONF = {
			host: 'localhost',
			user: 'root',
			password: 'root1234',
			port: '3306',
			database: 'myBlog',
		}
	}

	if (env === 'production') {
		MYSQL_CONF = {
			host: 'localhost',
			user: 'root',
			password: 'root1234',
			port: '3306',
			database: 'myBlog',
		}
	}
}
MYSQL_CONFFN()
let REDIS_CONF = null
const REDIS_CONFFN = () => {
	if (env === 'dev') {
		REDIS_CONF = {
			prot: 6379,
			host: '127.0.0.1',
		}
	} else {
		REDIS_CONF = {
			prot: 6379,
			host: '127.0.0.1',
		}
	}
}
REDIS_CONFFN()
module.exports = {
	MYSQL_CONF,
	REDIS_CONF,
	AUTHORIZATION,
}
