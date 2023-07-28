const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
  host: 'your_database_host',
  dialect: 'mysql',
});

const LoginUser = sequelize.define('LoginUser', {
  userid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pwd: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  snsid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'loginusers',
  timestamps: true, // Enable createdAt and updatedAt fields
});

module.exports = LoginUser;