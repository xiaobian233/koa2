const app = require('../app')
const prot = process.env.PORT || 5001

app.listen(prot, () => {
	console.error(`服务启动: http:localhost:${prot}`)
})
