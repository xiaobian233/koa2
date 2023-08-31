const router = require('koa-router')()

router.get('/get', ctx => {
	ctx.Res('开心就好鸭!')
})

router.post(`/post`, ctx => {
	console.error(ctx.request.body, 'ctx.request.body');
	ctx.Res('这是post请求')
})

module.exports = router
