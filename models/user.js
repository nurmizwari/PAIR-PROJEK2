'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.belongsTo(models.Department)
      User.hasMany(models.Overtime)
    }
   
  }
  User.init({
    DepartmentId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        notNull:{
          msg:"Department cannot be Empty"
        },notEmpty:{
          msg: "Department cannot be empty"
        }
      }},
    password: { type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull:{
          msg:"Password cannot be Empty"
        },notEmpty:{
          msg: "Password cannot be empty"
        }
      }},
    email: { type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull:{
          msg:"Email cannot be Empty"
        },notEmpty:{
          msg: "Email cannot be empty"
        },isEmail: {
          msg:"Must be email Valid"
        }
      }},
    role: { type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull:{
          msg:"Role cannot be Empty"
        },notEmpty:{
          msg: "Role cannot be empty"
        }
      }},
  }, {
    hooks:{
        beforeCreate(instance, options){
          let salt = bcrypt.genSaltSync(8);
          let hash = bcrypt.hashSync(instance.password, salt);

          instance.password = hash //! proses hashing password
        }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};