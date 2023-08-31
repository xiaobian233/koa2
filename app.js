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

// redis
const session = require('koa-generic-session')
const { REDIS_CONF } = require('./config/db')
const redisStore = require('koa-redis')
app.keys = ['SESSION_ID']
app.use(
	session({
		key: 'SESSION_ID',
		cookie: {
			maxAge: 24 * 60 * 60 * 1000,
			path: '/',
			// domain: 'http://127.0.0.1',
			httpOnly: true,
			overwrite: false,
			sameSite: 'none',
		},
		store: redisStore({
			// all: '127.0.0.1:6379',
			all: `${REDIS_CONF.host}:${REDIS_CONF.prot}`,
		}),
	})
)

// 初始化 及 响应时间 - 中间件 - 基于洋葱模型 不可更改执行顺序
const initUse = require(`./middleware/initMessage.js`) // 1
const loginCheck = require(`./middleware/loginCheck.js`) // 2
app.use(initUse)
app.use(loginCheck)

// 注入router
const router = require('./router/index')
app.use(router.routes()).use(router.allowedMethods())

module.exports = app
