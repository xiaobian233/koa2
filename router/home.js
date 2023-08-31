const router = require('koa-router')()


router.get('/get', ctx => {
	ctx.Res('开心就好鸭!')
})

router.post(`/post`, ctx => {
	ctx.Res(ctx.session.user)
})

module.exports = router
