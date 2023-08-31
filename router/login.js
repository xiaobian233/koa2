const Router = require('koa-router')
const login = new Router()

login.get('home/get', ctx => {
	ctx.Res('开心就好鸭!')
})

login.post(`home/post`, ctx => {
	console.error(ctx.request.body, 'ctx.request.body');
	ctx.Res('这是post请求')
})

module.exports = login
