'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Finders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      make: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      startYear: {
        type: Sequelize.STRING
      },
      endYear: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      OEM1: {
        type: Sequelize.STRING
      },
      OEM2: {
        type: Sequelize.STRING
      },
      OEM3: {
        type: Sequelize.STRING
      },
      OEM4: {
        type: Sequelize.STRING
      },
      OEM5: {
        type: Sequelize.STRING
      },
      OEM6: {
        type: Sequelize.STRING
      },
      OEM6: {
        type: Sequelize.STRING
      },
      OEM7: {
        type: Sequelize.STRING
      },
      OEM8: {
        type: Sequelize.STRING
      },
      OEM9: {
        type: Sequelize.STRING
      },
      OEM10: {
        type: Sequelize.STRING
      },
      qfpp: {
        type: Sequelize.STRING
      },
      realtedModel1: {
        type: Sequelize.STRING
      },
      relatedModel2: {
        type: Sequelize.STRING
      },
      relatedModel3: {
        type: Sequelize.STRING
      },
      relatedModel4: {
        type: Sequelize.STRING
      },
      relatedModel5: {
        type: Sequelize.STRING
      },
      realtedModel6: {
        type: Sequelize.STRING
      },
      relatedModel7: {
        type: Sequelize.STRING
      },
      relatedModel8: {
        type: Sequelize.STRING
      },
      relatedModel9: {
        type: Sequelize.STRING
      },
      relatedModel10: {
        type: Sequelize.STRING
      },
      relatedPart1: {
        type: Sequelize.STRING
      },
      relatedPart2: {
        type: Sequelize.STRING
      },
      relatedPart3: {
        type: Sequelize.STRING
      },
      relatedPart4: {
        type: Sequelize.STRING
      },
      relatedPart5: {
        type: Sequelize.STRING
      },
      relatedPart6: {
        type: Sequelize.STRING
      },
      relatedPart7: {
        type: Sequelize.STRING
      },
      relatedPart8: {
        type: Sequelize.STRING
      },
      relatedPart9: {
        type: Sequelize.STRING
      },
      relatedPart10: {
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Finders');
  }
};