const fs = require('fs')
const path = require('path')

const filesRender = (arr, res) => {
	const files = []
	arr.forEach(item => {
		files.push({
			createTime: item.lastModifiedDate,
			filePath: item.filepath,
			fileType: item.mimetype,
			fileName: item.fileName,
			originalFilename: item.originalFilename,
			size: item.size,
			hash: item.newFilename,
			path: item.path,
			suffix: item.suffix,
			file: item,
		})
	})
	res(files)
}
module.exports = (ctx, dirPaths) => {
	const filePath = path.resolve(
		__dirname,
		dirPaths ? dirPaths : '../static/uploads/'
	)
	return new Promise((res, rej) => {
		try {
			const uploadFilePublic = function (ctx, files, flag) {
				// 读取并写入文件
				const fileFunc = function (file) {
					let fileReader, writeStream, fileName
					fileReader = fs.createReadStream(file.filepath)
					fileName = file.originalFilename.split('.')
					file.suffix = fileName.splice(fileName.length - 1, 1).toString()
					file.fileName = `${fileName}-${file.newFilename}.${file.suffix}`
					file.path = filePath + `/${file.fileName}`
					writeStream = fs.createWriteStream(file.path)
					fileReader.pipe(writeStream)
				}
				// 返回文件地址
				const returnFunc = function (flag) {
					const flags = {
						true: () => filesRender(files, res),
						false: () => filesRender([files], res),
					}
					flags[flag]()
				}
				const doneFiles = () => {
					;(Array.isArray(files) ? files : [files]).forEach(fileFunc)
					if (!fs.existsSync(filePath)) {
						fs.mkdir(filePath, err => {
							if (err) {
								throw new Error(err)
							} else {
								returnFunc(flag)
							}
						})
					} else returnFunc(flag)
				}
				doneFiles()
			}
			let files = ctx.request.files.file
			Array.isArray(files)
				? uploadFilePublic(ctx, files, true)
				: uploadFilePublic(ctx, files, false)
		} catch (err) {
			console.error(err, 'upload: 文件上传失败')
			rej(err)
		}
	})
}
