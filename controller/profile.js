const { Department, User, Profile, Overtime } = require("../models");
const formatCreatedDate = require("../helper/formatDateProfile");
const { Op } = require("sequelize");

class ProfileController {
  static home(req, res) {
    let role = req.session.role;
    let search = req.query.search;

    let options = {};

    if (search) {
      options.include = [
        Department,
        Overtime,
        {
          model: Profile,
          where: {
            name: { [Op.iLike]: `%${search}%` },
          },
        },
      ];
    } else {
      options.include = [Department, Overtime, Profile];
    }
    console.log(options);

    //! INI HALAMAN HOME DATA
    User.findAll(options)
      .then((result) => {
        // console.log(result);
        // res.send('masuk')
        res.render("home", { result, role });
        // res.send(result)
      })
      .catch((err) => {
        // console.log(err);

        res.send(err);
      });
  }

  static getEdit(req, res) {
    // console.log(req.params);
    let errors = req.query.err;
    let id = req.params.ProfileId;
    Profile.findByPk(id)
      .then((result) => {
        // res.send(result)
        res.render("./profile/edit", { result, formatCreatedDate, errors });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static posEdit(req, res) {
    // console.log(req.params,'<<params');
    // console.log(req.body.ProfileId);
    let id = req.params.ProfileId;
    let { name, gender, dateOfBirth, status } = req.body;
    Profile.update({ name, gender, dateOfBirth, status }, { where: { id } })
      .then((_) => {
        res.redirect("/home");
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          err = err.errors.map((e) => e.message);
          res.redirect(`/employee/${id}/edit?err=${err}`);
        } else {
          res.send(err);
        }
      });
  }

  static profile(req, res) {
    let role = req.session.role;
    User.findAll({ include: [Profile, Department] })
      .then((result) => {
        // res.send(result)
        res.render("./profile/employee", { result, role });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static delete(req, res) {
    console.log(req.params);
    let id = req.params.ProfileId;

    Profile.destroy({ where: { id } })
      .then((result) => {
        return User.destroy({ where: { id } });
      })
      .then((result) => {
        res.redirect("/employee");
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static landingPage(req, res) {
    res.render("landingPage");
  }
}

module.exports = ProfileController;
