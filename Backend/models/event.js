'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      //  association here
    }
  }
  Event.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};