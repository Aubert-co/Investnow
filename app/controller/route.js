const route = require('express').Router()
const loginAndRegister  = require('./loginAndregister')
const userassest = require('./UserAssets')
const trades = require('./trader')
const assets = require('./assets')
const quiz = require('./quiz')
const authMiddleware  = require('../middleware/authMiddleware')





route.use(loginAndRegister)
route.use(assets)
route.use(authMiddleware)

route.use(userassest)
route.use(quiz)
route.use(trades)

module.exports= route