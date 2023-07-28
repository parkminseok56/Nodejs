const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class User extends Model {}

User.init({
  userid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // 다른 필드들 정의
}, {
  sequelize,
  modelName: 'User',
  tableName: 'loginusers', // 만약 테이블명이 loginusers가 아니라면 해당 테이블명으로 수정
});

// 다른 모델과의 관계 설정
User.associate = (models) => {
  User.hasMany(models.OtherModel, { foreignKey: 'userId' }); // 다른 모델과의 관계 설정 예시
};

module.exports = User;