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
        User.findByPk(id,{include:"Overtimes"})
        .then((result) => {
            // console.log(result);
            res.render('./overtime/overtime',{result,formatCreatedDate})
            // res.send(result)
        }).catch((err) => {
            console.log(err);
            res.send(err)
        });
    }

    static edit(req, res){
        // console.log(req.params);
        let id = req.params.UserId
        Overtime.findByPk(id)
        .then((result) => {
            // res.send(result)
            res.render('./overtime/edit',{result})
        }).catch((err) => {
            
        });
    }

    static saveEdit(req, res){

        // console.log(req.params);
        let id = req.params.UserId
        // console.log(req.body);
        let {date,description} = req.body

        Overtime.update({date,description},{where:{id}})
        .then(_ => {
            res.redirect(`/overtime/${id}/view`)
        }).catch((err) => {
            res.send(err)
        });
    }

    static delete(req, res){
        console.log(req.params);
        let id = req.params.UserId
        Overtime.destroy({where:{id}})
        .then((result) => {
            res.redirect(`/overtime/${id}/view`)
        }).catch((err) => {
            res.send(err)
        });
    }

}

module.exports = OvertimeController