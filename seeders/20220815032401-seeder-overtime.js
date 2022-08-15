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

     
     let value = JSON.parse(fs.readFileSync('./data/overtime.json','utf-8')).map((el)=>{
      return {
        date:el.date,
        UserId:el.UserId,
        description:el.description,
        createdAt:new Date(),
        updatedAt:new Date()
      }
     })
     
    //  console.log(value);
     return queryInterface.bulkInsert('Overtimes',value,{});
  },

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Overtimes',null,{});
  }
};
