const { exec } = require('../db/mysql')

exports.setUserFile = async (user, files) => {
	let {
		size,
		hash,
		mimetype,
		type,
		originalName,
		fileName,
		url,
		status,
		prviewUrl,
		suffix,
	} = files
	let sql = `insert into koa.file (userId,size,hash,mimetype,type,originalName,fileName,url,status,prviewUrl, suffix) values ('${user.id}','${size}','${hash}','${mimetype}','${type}','${originalName}','${fileName}','${url}','${status}','${prviewUrl}', '${suffix}')`
	let r = await exec(sql)
	if (r.affectedRows > 0) return true
	return false
}

exports.getUserFile = async (fileId, id = null, limit = 1) => {
	let sql = `select * from koa.file where id='${fileId}'`
	let userSql = `and userId=${id}`
	let limitSql = ` limit ${limit}`
	sql = id ? sql + userSql + limitSql : sql + limitSql
	let r = await exec(sql)
	return (r && r[0]) || false
}
