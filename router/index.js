const Router = require('koa-router')
const router = new Router()

const login = require('./login')
const home = require('./home')
const user = require('./user')
const file = require('./file')

router.use('/login', login.routes(), login.allowedMethods())
router.use('/home', home.routes(), home.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())
router.use('/file', file.routes(), file.allowedMethods())

module.exports = router
