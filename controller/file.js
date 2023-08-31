const { exec } = require('../db/mysql')

exports.setUserFile = async (user, files) => {
	const fileId = files.map(item => item.hash)
	let sql = `update  koa.user set files='${JSON.stringify(
		files
	)}', fileId='${JSON.stringify(fileId)}' where id=${user.id}`
	let r = await exec(sql)
	if (r.affectedRows > 0) return true
	return false
}

exports.getUserFile = async user => {
	let sql = `select * from koa.user where id='${user.id}' limit 1`
	let r = await exec(sql)
	return (r && r.files && JSON.parse(r.files)) || false
}
