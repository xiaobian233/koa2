const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db')
const con = mysql.createConnection(MYSQL_CONF)
const logger = require('../utils/logger')

con.connect()

function exec(sql) {
	logger.info('exec执行:' + sql)
	return new Promise((res, rej) => {
		con.query(sql, (error, data) => {
			if (error) return rej(error)
			res(data)
			logger.info({ exec执行完毕: data })
		})
	})
}

module.exports = {
	exec,
}
