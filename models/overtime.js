'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Overtime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Overtime.belongsTo(models.User)
    }

    

    // get formatDate(){      
    //   const options = {
    //     weekday: "long",
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    //   };
    //   return this.date.toLocaleDateString("id-ID", options);
    //   }
    get formatDate(){
      var date = this.date
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
    }
  }
  Overtime.init({
    date: { type: DataTypes.DATE,
      allowNull:false,
      validate: {
        notNull:{
          msg:"Date cannot be empty"
        },notEmpty:{
          msg: "Date cannot be empty"
        }
      }},
    UserId: DataTypes.INTEGER,
    description:{ type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull:{
          msg:"Date cannot be empty"
        },notEmpty:{
          msg: "Date cannot be empty"
        }
      }},
  }, {
    sequelize,
    modelName: 'Overtime',
  });
  return Overtime;
};