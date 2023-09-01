const router = require('koa-router')()
const oss = require('../utils/ossUpload')
// const uploadFile = require('../utils/uoload')
const { setUserFile, getUserFile } = require('../controller/file')

// 文件上传
router.post(`/`, async ctx => {
	const r = await oss.upload(ctx.request.files.file).catch(ctx.Rej)
	const res = await setUserFile(ctx.session.user, r.fileSqlObj)
	ctx.Res(res)
})

// 文件下载
router.get('/down', async ctx => {
	let { fileId, userId } = ctx.reqBody.query
	let file = await getUserFile(fileId, userId)
	let r = await oss.downFile(file).catch(ctx.Rej)
	ctx.set('Content-Disposition', `attachment; filename="${file.originalName}"`)
	ctx.Res(r.stream)
})

module.exports = router
