const router = require('koa-router')()
const { login } = require('../controller/user')
const { AUTHORIZATION } = require('../config/db.js')
const jwt = require('jsonwebtoken')

router.post(`/`, async ctx => {
	const user = await login(ctx.reqBody.body)
	if (user) {
		const token = jwt.sign(
			{
				username: user.username,
				id: user.id,
			},
			AUTHORIZATION.jwtSecret,
			{ expiresIn: AUTHORIZATION.tokenExpiresTime }
		)
		ctx.session.token = token
		return ctx.Res({ token, username: user.username })
	}
	ctx.Rej('登录失败')
})

module.exports = router
