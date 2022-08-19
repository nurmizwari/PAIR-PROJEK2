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
    
    formatCreatedDate(){
      const created = this.date;
      const year = created.getFullYear();
      let month = created.getMonth() + 1;
      let dated = created.getDate();
  
      if(month < 10) {
          month = `0${month}`;
      }
  
      if(dated < 10) {
          dated = `0${dated}`;
      }
      // console.log(`${date}-${month}-${year}`);
      return `${year}-${month}-${dated}`;
      
      // return this.dateOfBirth.toISOString().split("T")[0];
      }


    

  
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
          msg:"Description cannot be empty"
        },notEmpty:{
          msg: "Description cannot be empty"
        }
      }},
  }, {
    sequelize,
    modelName: 'Overtime',
  });
  return Overtime;
};