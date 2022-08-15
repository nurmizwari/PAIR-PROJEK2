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
   let value = JSON.parse(fs.readFileSync('./data/department.json','utf-8')).map((el)=>{
    return {
      divisi:el.divisi,
      createdAt:new Date(),
      updatedAt:new Date()
    }
   })

   return queryInterface.bulkInsert('Departments',value,{});
  },

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Departments', null, {})
  }
};
