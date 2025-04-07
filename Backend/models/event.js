'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
          const Event = sequelize.define("Event", {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            date: DataTypes.DATE,
            location: DataTypes.STRING,
            userId: {
              type: DataTypes.INTEGER,
              allowNull: false,
            },
          });
          
          Event.associate = (models) => {
            Event.belongsTo(models.User, { foreignKey: "userId" });
             Event.hasMany(models.Attending, { foreignKey: "eventId" });
          };

        
          return Event;
        };