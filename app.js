const Koa = require('koa')
const app = new Koa()
const logger = require('./utils/logger')

// body解析
const { koaBody } = require('koa-body')
app.use(
	koaBody({
		enableTypes: ['json', 'form', 'text'],
		multipart: true,
	})
)

// 跨域
const cors = require('koa2-cors')
app.use(
	cors({
		origin: '*',
		// exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
		maxAge: 60,
		credentials: true,
		// allowMethods: ['GET', 'POST', 'DELETE'],
		// allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
	})
)

// 初始化 及 设置时间
const initMessage = require(`./middleware/initMessage.js`)
const loginCheck = require(`./middleware/loginCheck.js`)
app.use(initMessage, loginCheck, async (ctx, next) => {
	await next()
})

// 注入router
const router = require('./router/index')
app.use(router.routes()).use(router.allowedMethods())

module.exports = app
