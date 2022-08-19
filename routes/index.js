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
//! SESSION GLOBAL
router.use((req, res, next) => {
    // console.log(req.session)
    // next()
    if (!req.session.emailId ) {
        const errors = 'Please Login First ! '
        res.redirect(`/login?errors=${errors}`)
    }else{
        next() //! kalau ada session terserah mau kemana bebasss
    }
})
//! KEBAWAHNYA AUTO KE APPLY MIDDLEWARE INI



    // console.log(req.session)
    // next()
    //!     SESSION LOCAL
   let role =  function role(req, res, next){

        if (!req.session.role || req.session.role !== 'Admin') {
            const errors = 'Please Login First ! '
            res.redirect(`/login?errors=${errors}`)
        }else{
            next() //! kalau ada session terserah mau kemana bebasss
            // console.log('masuk');
        }
    }


router.get('/home',ProfileController.home)


// router.get('/profile/add',ProfileController.addProfile)
// router.post('/profile/add',ProfileController.saveProfile)

router.get('/employee/:ProfileId/edit',role,ProfileController.getEdit)
router.post('/employee/:ProfileId/edit',role,ProfileController.posEdit)

// router.get('/overtime',OvertimeController.overtime)
router.get('/overtime/:ProfileId/add',role,OvertimeController.addOvertimeGet)
router.post('/overtime/:ProfileId/add',role,OvertimeController.addOvertimePost)

router.get('/overtime/:ProfileId/view',role,OvertimeController.view)

router.get('/overtime/:Overtime/view/edit',role,OvertimeController.edit)
router.post('/overtime/:Overtime/view/edit',role,OvertimeController.saveEdit)
router.get('/overtime/:Overtime/view/delete',role,OvertimeController.delete)
// router.post('/overtime/:ProfileId/edit',OvertimeController.edit)
router.get('/employee',ProfileController.profile)
router.get('/employee/:ProfileId/delete',role,ProfileController.delete)

router.get('/department',DepartmentController.department)

router.get('/logout',UserController.logout)



module.exports = router