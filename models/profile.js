'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }

    get formatCreatedDate(){
      const created = this.dateOfBirth;
      const year = created.getFullYear();
      let month = created.getMonth() + 1;
      let date = created.getDate();
  
      if(month < 10) {
          month = `0${month}`;
      }
  
      if(date < 10) {
          date = `0${date}`;
      }
      // console.log(`${date}-${month}-${year}`);
      return `${year}-${month}-${date}`;
      
      // return this.dateOfBirth.toISOString().split("T")[0];
      }

   
  }
  Profile.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};