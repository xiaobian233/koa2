const { exec } = require('../db/mysql')
const getList = async (author, keyword) => {
	let sql = `select * from myBlog.blogs where 1=1 `
	if (author) sql += `and author='${author}'`
	if (keyword) sql += `and title like '%${keyword}%'`
	sql += `order by createtime desc`
	return await exec(sql)
} 

const getDetail = async id => {
	let sql = `select * from myBlog.blogs where id='${id}'`
	let data = await exec(sql)
	data = (data && data.length > 0 && data[0]) || {}
	return data
}

const newBlog = async (blogData = {}) => {
	let { title, content, author } = blogData
	let sql = `insert into myBlog.blogs (title, content, createtime, author) values ('${title}','${content}','${Date.now()}','${author}')`
	let r = await exec(sql)
	if (r.changedRows == 0) {
		let sql = `select * from myBlog.blogs  order by id desc limit 1`
		let data = await exec(sql)
		return (data && data[0]) || false
	}
	return false
}

const uploadBlog = async body => {
	let { title, content, author, id } = body
	let sql = `update  myBlog.blogs set title='${title}', content='${content}', author='${author}' where id=${id}`
	let r = await exec(sql)
	if (r.affectedRows > 0) return true
	return false
}

const deleteID = async (id, author) => {
	let sql = `delete from myBlog.blogs where id='${id}' and author='${author}' `
	console.error(sql, 'sql');
	let r = await exec(sql)
	if (r.affectedRows > 0) return true
	return false
}

module.exports = {
	getList,
	getDetail,
	newBlog,
	deleteID,
	uploadBlog,
}
