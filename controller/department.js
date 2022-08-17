const { Department,User,Profile,Overtime } = require("../models");

class DepartmentController{
   static department(req,res){
        Department.department({where:{divisi:{limit:1}}})
        .then((result) => {
            // res.send(result)
            res.render('department/department',{result})
        }).catch((err) => {
            res.send(err)
        });
   }
}

module.exports = DepartmentController