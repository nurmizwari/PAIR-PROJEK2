'use strict';
const fs = require('fs')
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let value = JSON.parse(fs.readFileSync('./data/user.json','utf-8')).map((el)=>{
      return {
        DepartmentId:el.DepartmentId,
        password:el.password,
        email:el.email,
        role:el.role,
        createdAt:new Date(),
        updatedAt:new Date()
      }
     })
  
     return queryInterface.bulkInsert('Users',value,{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     * return queryInterface.bulkInsert('Users',value,{});
     */
     return queryInterface.bulkDelete('Users',null,{});
  }
};
