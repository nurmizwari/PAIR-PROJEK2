
const { Department,User,Profile,Overtime } = require("../models");
const bcrypt = require('bcryptjs')
const {nodeMail} = require('../helper/nodemailer')

class UserController{
    
    static getRegister(req,res){
        let errors = req.query.err
        User.findAll({include:{model:Department}})
        .then((result) => {
            res.render('register',{result,errors})
        }).catch((err) => {
            res.send(err)
        });
    } 

    static posRegister(req,res){
        // console.log(req.body);
        let{email,password,role,DepartmentId} = req.body
        let {name,gender,dateOfBirth,status} = req.body

        User.create({email,password,role,DepartmentId})
        .then((result) => {
            console.log(result);
            return Profile.create({name,gender,dateOfBirth,status,UserId:result.id})
        })
        .then((result)=>{
            // console.log(result,'result 2');
            // res.send(result)
            nodeMail(email)
            res.redirect('/login')

        })
        .catch((err) => {
            if (err.name === "SequelizeValidationError") {
                err = err.errors.map((e=>e.message))
                res.redirect(`/register?err=${err}`)
            } else{
            res.send(err)
            }
        });

        
    }

    static getlogin(req, res){
        let errors = req.query.errors
        res.render('login',{errors})
    }
    static poslogin(req, res){
          // apakah username sama password yang diinput itu username nya ada?
        // 1.findOne user dari username
        // 2 kalo user ada compare plain password apakah sama dengan hash password di db
        // 2.a kalu user gak ada gak boleh masuk ke home , keluar error
        // 3 kalo gak sama passwordnya gak boleh masuk ke home , keluar error
        // 4 kalo pw sesuai maaka redirect ke home
        // console.log(req.body);
        let {email, password} = req.body
        User.findOne({where:{email}})
        .then((email) => {
            if (email) {
                req.session.emailId = email.id //! SET SESSION LOGIN DI CONTROLLER
                req.session.role = email.role
                // console.log(email.password);
                // console.log(password);
                const isValidPassword = bcrypt.compareSync(password, email.password)//! true or false
                // console.log(isValidPassword);
                if (isValidPassword) {
                    return res.redirect('/home')
                }else{
                    const errors = 'Invalid email / password'
                    return res.redirect(`/login?errors=${errors}`)
                }
            }else{
                const errors = 'invalid username or password!'
                res.redirect(`/login?errors=${errors}`)
            }
        }).catch((err) => {
            // console.log(err);
            res.send(err)
        });
    }

    static logout(req, res){
        req.session.destroy((err)=>{
            if (err) {
                res.send(err)
            }else{
                res.redirect('/login')
            }
        })
    }

}


module.exports = UserController