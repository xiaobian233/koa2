const router = require('koa-router')()
const uploadFile = require('../utils/uoload')
const { setUserFile } = require('../controller/file')

router.post(`/`, async ctx => {
	const files = await uploadFile(ctx).catch(e => ctx.Rej(e))
	const r = await setUserFile(ctx.session.user, files)
	if (r) return ctx.Res({ data: '文件上传成功', files: files })
	ctx.Rej('文件上传失败')
})

module.exports = router
