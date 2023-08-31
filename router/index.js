const Router = require('koa-router')
const router = new Router()

const login = require('./login')
const home = require('./home')
const user = require('./user')

router.use('/login', login.routes(), login.allowedMethods())
router.use('/home', home.routes(), home.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())

module.exports = router
