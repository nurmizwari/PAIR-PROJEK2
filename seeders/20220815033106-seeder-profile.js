'use strict';
const fs = require('fs')
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let value = JSON.parse(fs.readFileSync('./data/profile.json','utf-8')).map((el)=>{
      return {
        name:el.name,
        gender:el.gender,
        dateOfBirth:el.dateOfBirth,
        status:el.status,
        UserId:el.UserId,
        createdAt:new Date(),
        updatedAt:new Date()
      }
     })
     
    //  console.log(value);
     return queryInterface.bulkInsert('Profiles',value,{});
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Profiles',null,{});
  }
};
