const { login } = require('../controller/user')
const { verify } = require('../utils/verify')
const { AUTHORIZATION } = require('../config/db.js')
const jwt = require('jsonwebtoken')

// 服务前缀不增加拦截
const prevfix = ['/login']

// 前缀服务判断是否需要判断token
const userNext = async (ctx, next) => {
	userNext.next = false
	const url = `/${ctx.reqBody.url.split('/')[1]}`
	let bol = prevfix.includes(url)
	if (bol) return await next()
	userNext.next = true
}

// 验证token 为空提示登录失败
const hasToken = async (ctx, next) => {
	if (userNext.next) {
		ctx.Rej('登录失效')
	}
}

module.exports = async (ctx, next) => {
	await userNext(ctx, next)
	await hasToken(ctx, next)
}
