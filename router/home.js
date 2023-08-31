const Router = require('koa-router')
const home = new Router()

home.get('/get', ctx => {
	ctx.Res('开心就好鸭!')
})

home.post(`/post`, ctx => {
	console.error(ctx.request.body, 'ctx.request.body');
	ctx.Res('这是post请求')
})

module.exports = home
