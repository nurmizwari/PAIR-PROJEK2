
const { Department,User,Profile,Overtime } = require("../models");

class ProfileController{
    static home(req, res){
        // Console.log('masuk');
        // res.send('masuk')
        //! INI HALAMAN HOME DATA
        User.findAll({include:[Profile, Department, Overtime]})
        .then((result) => {
          res.render('./home',{result})
        // res.send(result)
        }).catch((err) => {
            // console.log(err);
            res.send(err)
        });
    }


    static addProfile(req, res){
        res.render('./profile/add')
    }

    static saveProfile(req, res){
        console.log(req.body);

        let {name,gender,dateOfBirth,status} = req.body
        // Profile.create({name,gender,dateOfBirth,status,UserId:})
    }
}

module.exports= ProfileController