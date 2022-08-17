const  ProfileController = require('../controller/profile')
const OvertimeController  = require('../controller/overtime')
const UserController  = require('../controller/user')
const DepartmentController = require('../controller/department')

const router = require('express').Router()


router.get('/',ProfileController.landingPage)

router.get('/register',UserController.getRegister)
router.post('/register',UserController.posRegister)


router.get('/login',UserController.getlogin)
router.post('/login',UserController.poslogin)

//! PENERAPAN MIDDLEWARE
router.use((req, res, next) => {
    // console.log(req.session)
    // next()
    if (!req.session.emailId) {
        const errors = 'Please Login First ! '
        res.redirect(`/login?errors=${errors}`)
    }else{
        next() //! kalau ada session terserah mau kemana bebasss
    }
})
//! KEBAWAHNYA AUTO KE APPLY MIDDLEWARE INI

router.get('/home',ProfileController.home)


// router.get('/profile/add',ProfileController.addProfile)
// router.post('/profile/add',ProfileController.saveProfile)

router.get('/employee/:ProfileId/edit',ProfileController.getEdit)
router.post('/employee/:ProfileId/edit',ProfileController.posEdit)

// router.get('/overtime',OvertimeController.overtime)
router.get('/overtime/:ProfileId/add',OvertimeController.addOvertimeGet)
router.post('/overtime/:ProfileId/add',OvertimeController.addOvertimePost)

router.get('/overtime/:ProfileId/view',OvertimeController.view)

router.get('/overtime/:Overtime/view/edit',OvertimeController.edit)
router.post('/overtime/:Overtime/view/edit',OvertimeController.saveEdit)
router.get('/overtime/:Overtime/view/delete',OvertimeController.delete)
// router.post('/overtime/:ProfileId/edit',OvertimeController.edit)
router.get('/employee',ProfileController.profile)
router.get('/employee/:ProfileId/delete',ProfileController.delete)

router.get('/department',DepartmentController.department)

router.get('/logout',UserController.logout)



module.exports = router