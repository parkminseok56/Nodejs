const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
// 현재 위치에서 한 단계 상위 폴더를 가서 config 폴더에 있는 config.json 파일을 require
// [env] : 필드 키 값이 'development' 인 항목을 require
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize
= new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;     // 접속 정보 저장된 객체
db.Sequelize = Sequelize;     // sequelize 기능이 있는 객체
// db ={ sequelize:sequelize, Sequelize:Sequelize};
// db ={ sequelize, Sequelize};

module.exports = db;
