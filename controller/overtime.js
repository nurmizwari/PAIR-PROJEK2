const { Department,User,Profile,Overtime } = require("../models");
const formatCreatedDate = require('../helper/formatDate')

class OvertimeController{
    static addOvertimeGet(req, res){
        // console.log(req.params);
        let id = req.params.ProfileId
        Profile.findByPk(id)
        .then((result) => {
            res.render('./overtime/add',{result})  
        }).catch((err) => {
            res.send(err)
        });
    }
    static addOvertimePost(req, res){

        // console.log(req.body);
        // console.log(req.params, 'ini');
        let id = req.params.ProfileId
        // console.log(id);
        let {date,description} = req.body
        Overtime.create({date,UserId:id,description})
        .then((result) => {
            // console.log(result);
            // res.send(result)
            res.redirect(`/`)
        }).catch((err) => {
            res.send(err)
        });
    }


    static view(req,res){
        
        // !LIST TOTAL LEMBURAN

        // console.log(req.params);{ ProfileId: '1' }
        let id = req.params.ProfileId
        User.findAll({include:"Overtimes"})
        .then((result) => {
            console.log(result);
            res.render('./overtime/overtime',{result,formatCreatedDate})
            // res.send(result)
        }).catch((err) => {
            console.log(err);
            res.send(err)
        });
    }
}

module.exports = OvertimeController