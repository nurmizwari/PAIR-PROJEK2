const  ProfileController = require('../controller/profile')
const OvertimeController  = require('../controller/overtime')
const UserController  = require('../controller/user')

const router = require('express').Router()


router.get('/register',UserController.getRegister)
router.post('/register',UserController.posRegister)

router.get('/',ProfileController.home)

// router.get('/overtime',OvertimeController.overtime)
router.get('/overtime/:ProfileId/add',OvertimeController.addOvertimeGet)
router.post('/overtime/:ProfileId/add',OvertimeController.addOvertimePost)
// router.post('/overtime/:ProfileId/edit',OvertimeController.edit)
router.get('/overtime/:ProfileId/view',OvertimeController.view)

router.get('/profile/add',ProfileController.addProfile)
// router.post('/profile/add',ProfileController.saveProfile)

module.exports = router