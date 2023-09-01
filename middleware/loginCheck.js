const { userInfo } = require('../controller/user')
const verify = require('../utils/verify')
const { AUTHORIZATION } = require('../config/db.js')
const logger = require('../utils/logger')

// 服务前缀不增加拦截 or url匹配判断
const prevfix = ['/login']
const urlfix = ['/file/down']

// 前缀服务判断是否需要判断token
const userNext = async (ctx, next) => {
	userNext.next = false
	// 前缀判断
	const url = `/${ctx.reqBody.url.split('/')[1]}`
	const _url = ctx.reqBody.url.split('?')[0]
	// 前缀判断 or url匹配判断
	let bol = prevfix.includes(url) || urlfix.some(url => url == _url)
	if (bol) return await next()
	userNext.next = true
}

// 验证token 为空提示登录失败
const hasTokenNext = async (ctx, next) => {
	if (userNext.next) {
		const token = ctx.header.authorization
		if (!(token !== null && token)) return ctx.Rej(`认证失效，请重新登录`)
		try {
			let payload = await verify(token, AUTHORIZATION.jwtSecret)
			if (payload) {
				let user = await userInfo(payload.id)
				if (!!user) {
					const userData = {
						name: payload.username,
						id: payload.id,
					}
					ctx.state.user = userData
					ctx.session.user = user
				}
			}
		} catch (err) {
			logger.error(err)
			ctx.Rej(`认证失效，请重新登录`)
			return
		}
		await next()
	}
}

module.exports = async (ctx, next) => {
	await userNext(ctx, next)
	await hasTokenNext(ctx, next)
}
