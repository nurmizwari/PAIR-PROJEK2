const { Department,User,Profile,Overtime } = require("../models");


class OvertimeController{
    static addOvertimeGet(req, res){
       
        let errors = req.query.err
        // console.log(req.params);
        let id = req.params.ProfileId
        Profile.findByPk(id)
        .then((result) => {
            res.render('./overtime/add',{result,errors})  
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
            console.log(result);
            let notification = `Succes add Overtime`
            res.redirect(`/home?notification=${notification}`)
        }).catch((err) => {
            if (err.name === 'SequelizeValidationError') {
                err = err.errors.map((e=>e.message))
                res.redirect(`/overtime/${id}/add?err=${err}`)
            }else{

                // console.log(err);
                res.send(err)
            }
        });
    }


    static view(req,res){
        
        // !LIST TOTAL LEMBURAN

        // console.log(req.params);{ ProfileId: '1' }
        let role = req.session.role
        let id = req.params.ProfileId
        User.findByPk(id,{include:"Overtimes"})
        .then((result) => {
            // console.log(result);
            res.render('./overtime/overtime',{result,role})
            // res.send(result)
        }).catch((err) => {
            // console.log(err);
            res.send(err)
        });
    }

    static edit(req, res){
        let succesEdit = req.query.succesEdit
        let errors = req.query.err
        console.log(req.params,'getEdit');
        let id = req.params.Overtime
        // console.log(id);
        Overtime.findByPk(id)
        .then((result) => {
            // res.send(result)
            res.render('./overtime/edit',{result,errors,succesEdit})
        }).catch((err) => {
            res.send(err)
        });
    }

    static saveEdit(req, res){

        // console.log(req.params);
        let id = req.params.Overtime
        // console.log(id);
        let {date,description} = req.body

        Overtime.update({date,description},{where:{id}})
        .then(result => {
            // console.log(result);

            let succesEdit = `Succes Edited`
            res.redirect(`/overtime/${id}/view/edit?succesEdit=${succesEdit}`)
        }).catch((err) => {

            if (err.name === 'SequelizeValidationError') {
                err = err.errors.map((e=>e.message))
                res.redirect(`/overtime/${id}/view/edit?err=${err}`)
            }else{

                // console.log(err);
                res.send(err)
            }
        });
    }

    static delete(req, res){
        // console.log(req.params);
        let id = req.params.Overtime
        Overtime.destroy({where:{id}})
        .then((result) => {
            res.redirect(`/home`)
        }).catch((err) => {
            // console.log(err);
            res.send(err)
        });
    }

}

module.exports = OvertimeController