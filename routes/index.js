const  ProfileController = require('../controller/profile')
const OvertimeController  = require('../controller/overtime')
const UserController  = require('../controller/user')

const router = require('express').Router()


router.get('/register',UserController.getRegister)
router.post('/register',UserController.posRegister)

router.get('/',ProfileController.home)
// router.get('/profile/add',ProfileController.addProfile)
// router.post('/profile/add',ProfileController.saveProfile)

router.get('/employee/:ProfileId/edit',ProfileController.getEdit)
router.post('/employee/:ProfileId/edit',ProfileController.posEdit)

// router.get('/overtime',OvertimeController.overtime)
router.get('/overtime/:ProfileId/add',OvertimeController.addOvertimeGet)
router.post('/overtime/:ProfileId/add',OvertimeController.addOvertimePost)

router.get('/overtime/:ProfileId/view',OvertimeController.view)

router.get('/overtime/:UserId/view/edit',OvertimeController.edit)
router.post('/overtime/:UserId/view/edit',OvertimeController.saveEdit)
router.get('/overtime/:UserId/view/delete',OvertimeController.delete)
// router.post('/overtime/:ProfileId/edit',OvertimeController.edit)
router.get('/employee',ProfileController.profile)
router.get('/employee/:ProfileId/delete',ProfileController.delete)



module.exports = router