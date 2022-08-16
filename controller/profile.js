
const { Department,User,Profile,Overtime } = require("../models");
const formatCreatedDate = require('../helper/formatDateProfile')

class ProfileController{
    static home(req, res){
        // Console.log('masuk');
        // res.send('masuk')
        //! INI HALAMAN HOME DATA
        User.findAll({include:[Profile, Department, Overtime]})
        .then((result) => {
            // console.log(result);
            // res.send('masuk')
          res.render('home',{result})
        // res.send(result)
        }).catch((err) => {
            // console.log(err);
            res.send(err)
        });
    }

    static getEdit(req,res){
        // console.log(req.params);
        let id = req.params.ProfileId
        Profile.findByPk(id)
        .then((result) => {
            // res.send(result)
            res.render('./profile/edit',{result,formatCreatedDate})
        }).catch((err) => {
            res.send(err)
        });
    }

    static posEdit(req, res){
        // console.log(req.params,'<<params');
        // console.log(req.body.ProfileId);
        let id = req.params.ProfileId
        let {name,gender,dateOfBirth,status} = req.body
        Profile.update({name,gender,dateOfBirth,status},{where:{id}})
        .then(_ => {
            res.redirect('/')
        }).catch((err) => {
            res.send(err)
        });
    }

    static profile(req, res){
        User.findAll({include:[Profile, Department]})
        .then((result) => {
            // res.send(result)
            res.render('./profile/employee',{result})
        }).catch((err) => {
            res.send(err)
        });
    }

    static delete(req,res){

        console.log(req.params);
        let id = req.params.ProfileId

        Profile.destroy({where:{id}})
        .then((result)=> {
            
            return User.destroy({where:{id}})
        })
        .then((result)=>{
            res.redirect('/employee')

        })
        .catch((err) => {
            res.send(err)
        });
    }
  
}

module.exports= ProfileController