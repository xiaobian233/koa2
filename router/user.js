const Router = require('koa-router')
const user = new Router()

user.get('home/get', ctx => {
	ctx.Res('开心就好鸭!')
})

user.post(`home/post`, ctx => {
	console.error(ctx.request.body, 'ctx.request.body');
	ctx.Res('这是post请求')
})

module.exports = user
