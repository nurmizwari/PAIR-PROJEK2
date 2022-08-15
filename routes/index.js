const router = require('express').Router()
const ProfileController = require('../controller/profile')

router.get('/',ProfileController.home)


module.exports = router