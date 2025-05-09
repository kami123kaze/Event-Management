

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });

      User.associate = (models) => {
      User.hasMany(models.Event, { foreignKey: "userId" });
      User.hasMany(models.Attending, { foreignKey: "userId" });
      };
     

  
    return User;
  };
  