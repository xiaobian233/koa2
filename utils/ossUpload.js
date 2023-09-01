const OSS = require('ali-oss')
const config = {

}
const client = new OSS(config)

// 拦截所有异常error
const Pro = callback => {
	try {
		return function (...agr) {
			return new Promise(async (res, rej) => {
				await callback(res, rej, agr)
			})
		}
	} catch (err) {
		rej(err)
	}
}

// 查看文件
const lookFile = Pro(async (res, rej, [file, config = {}]) => {
	res(await client.signatureUrl(file.fileName, config))
})
exports.lookFile = lookFile

// sql
const fileSqlObj = async (up, f) => {
	const file = {}
	file.size = f.size
	file.hash = f.newFilename
	file.mimetype = f.mimetype
	file.type = f.mimetype.split('/')[1].toString()
	file.originalName = f.originalFilename
	file.fileName = f.fileName
	file.url = up.url
	file.status = up.res.status == 200 ? 1 : 0
	file.updateTime = Date.now()
	file.createTime = new Date(f.mtime || f.createTime || new Date()).getTime()
	file.prviewUrl = await lookFile(f)
	file.suffix = f.suffix
	return file
}

// 查看存储空间列表
exports.listBuckets = Pro(async res => {
	res(await client.listBuckets())
})

// 查看文件列表
exports.list = Pro(async res => {
	res(await client.list())
})

// 上传文件
const upload = Pro(async (res, rej, files) => {
	const headers = {
		// 指定Object的存储类型。
		'x-oss-storage-class': 'Standard',
		// 指定Object的访问权限。
		'x-oss-object-acl': 'private',
		// 通过文件URL访问文件时，指定以附件形式下载文件，下载后的文件名称定义为example.jpg。
		// 'Content-Disposition': 'attachment; filename="example.jpg"'
		// 设置Object的标签，可同时设置多个标签。
		// 'x-oss-tagging': 'Tag1=1&Tag2=2',
		// 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
		'x-oss-forbid-overwrite': 'true',
		'Content-Type': 'image/jpeg',
	}
	const [file] = files
	let fileName = file.originalFilename.split('.')
	let suffix = fileName.splice(fileName.length - 1, 1).toString()
	file.suffix = suffix
	file.fileName = `${fileName}_${file.newFilename}.${suffix}`
	const r = await client.put(file.fileName, file.filepath, { headers })
	r.fileSqlObj = await fileSqlObj(r, file)
	r.file = file
	res(r)
})
exports.upload = upload

// 下载文件
exports.downFile = Pro(async (res, rej, [file]) =>
	res(await client.get(file.fileName))
)

// 删除文件
const deleteFile = Pro(async (res, rej, [file]) =>
	res(await client.delete(file.fileName))
)
exports.deleteFile = deleteFile

// 重命名文件
exports.reNameFile = Pro(async (res, rej, [file, newFile]) => {
	const copy = await client.copy(newFile.fileName, file.fileName)
	const deleteResult = await deleteFile(file)
	res({ deleteResult, copy })
})
