
const { Department,User,Profile,Overtime } = require("../models");

class ProfileController{
    static home(req, res){
        // Console.log('masuk');
        // res.send('masuk')
        User.findAll({include:[Profile, Department]})
        .then((result) => {
          res.render('./home',{result})
        }).catch((err) => {
            console.log(err);
            res.send(err)
        });
    }
}

module.exports= ProfileController