const resBody = ctx => {
	let method = ctx.method
	let query = ctx.query
	let params = ctx.params
	let url = ctx.url
	let querystring = ctx.querystring
	let host = ctx.header.host
	let body = ctx.request.body
	ctx.reqBody = {
		method,
		query,
		url,
		querystring,
		host,
		params,
		body
	}
}

module.exports = {
	resBody,
}
