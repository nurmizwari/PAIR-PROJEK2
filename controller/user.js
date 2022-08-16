
const { Department,User,Profile,Overtime } = require("../models");


class UserController{
    
    static getRegister(req,res){

        User.findAll({include:{model:Department}})
        .then((result) => {
            res.render('register',{result})
        }).catch((err) => {
            res.send(err)
        });
    } 

    static posRegister(req,res){
        console.log(req.body);
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
            res.redirect('/')

        })
        .catch((err) => {
            res.send(err)
        });

        
    }

}


module.exports = UserController