'use strict';
module.exports = (sequelize, DataTypes) => {
  const Freightliner = sequelize.define('Freightliner', {
    model: DataTypes.STRING,
    category: DataTypes.STRING,
    startYear: DataTypes.STRING,
    endYear: DataTypes.STRING,
    OEM1: DataTypes.STRING,
    OEM2: DataTypes.STRING,
    OEM3: DataTypes.STRING,
    OEM4: DataTypes.STRING,
    OEM5: DataTypes.STRING,
    OEM6: DataTypes.STRING,
    OEM6: DataTypes.STRING,
    OEM7: DataTypes.STRING,
    OEM8: DataTypes.STRING,
    OEM9: DataTypes.STRING,
    OEM10: DataTypes.STRING,
    qfpp: DataTypes.STRING,
    realtedModel1: DataTypes.STRING,
    relatedModel2: DataTypes.STRING,
    relatedModel3: DataTypes.STRING,
    relatedModel4: DataTypes.STRING,
    relatedModel5: DataTypes.STRING,
    relatedPart1: DataTypes.STRING,
    relatedPart2: DataTypes.STRING,
    relatedPart3: DataTypes.STRING,
    relatedParts4: DataTypes.STRING,
    relatedPart5: DataTypes.STRING,
    relatedPart6: DataTypes.STRING,
    relatedPart7: DataTypes.STRING,
    relatedPart8: DataTypes.STRING,
    relatedPart9: DataTypes.STRING,
    relatedPart10: DataTypes.STRING,
    img: DataTypes.STRING,
    price: DataTypes.DOUBLE
  }, {
    underscored: true,
    timestamps:false
  });
  Freightliner.associate = function(models) {
    // associations can be defined here
  };
  return Freightliner;
};