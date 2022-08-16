
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
    }

}


module.exports = UserController