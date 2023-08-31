const router = require('koa-router')()
const uploadFile = require('../utils/uoload')

router.post(`/`, async ctx => {
	const files = await uploadFile(ctx).catch(e => ctx.Rej(e))
	ctx.Res(files)
})

module.exports = router
