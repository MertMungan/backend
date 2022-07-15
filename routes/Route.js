// Route.js
const express = require('express')
const router = express.Router()
const fs = require('fs')

const eventRoutes = require('./event') // import account route
const ruleRoutes = require('./rule.js') // import account route
const factRoutes = require('./facts') // import account route
router.use(ruleRoutes) // use account route
router.use(eventRoutes) // use account route
router.use(factRoutes) // use account route

module.exports = router
