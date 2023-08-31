const env = process.env.NODE_ENV
let MYSQL_CONF = {
	host: 'localhost',
	user: 'root',
	password: 'root1234',
	port: '3306',
	database: 'koa',
}
let REDIS_CONF = {
	prot: 6379,
	host: '127.0.0.1',
}

let AUTHORIZATION = {
	jwtSecret: 'jwtSecret',
	tokenExpiresTime: 60 * 60 * 12, // 60分钟
}

if (env != 'dev') {
	MYSQL_CONF = {
		host: 'localhost',
		user: 'root',
		password: 'root1234',
		port: '3306',
		database: 'koa',
	}
	REDIS_CONF = {
		prot: 6379,
		host: '127.0.0.1',
	}
	AUTHORIZATION = {
		jwtSecret: 'jwtSecret',
		tokenExpiresTime: 60 * 60 * 12, // 60分钟
	}
}
module.exports = {
	MYSQL_CONF,
	REDIS_CONF,
	AUTHORIZATION,
}
