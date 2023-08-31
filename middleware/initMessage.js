const { Res, Rej } = require('../model/index')
const logger = require('../utils/logger')
const { resBody } = require('../utils/getbody')
// 初始化打印及消息收集
function init(ctx) {
	resBody(ctx)
	ctx.Res = (data, code, message) => {
		const body = new Res(data, code, message)
		logger.info({ body, reqBody: ctx.reqBody })
		ctx.body = body
	}
	ctx.Rej = (message, code, data) => {
		const body = new Rej(message, code, data)
		logger.error({ body, reqBody: ctx.reqBody })
		ctx.body = body
	}
}
// 计算接口耗时
async function startEndTime(ctx, next) {
	const start = new Date()
	await next()
	const ms = new Date() - start
	logger.debug(`${ctx.method} ${ctx.url} - ${ms}ms`)
}
// 初始化函数
module.exports = async (ctx, next) => {
	init(ctx)
	await startEndTime(ctx, next)
}
