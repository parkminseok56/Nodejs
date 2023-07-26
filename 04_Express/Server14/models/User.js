const { Sequelize} = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init( sequelize ){
         return super.init(
            {   // 자동 증가 및 기본 키 필드 'id' 자동 생성
                email:{  // 일반 회원 가입 사용자용 사용자 식별 필드
                    type:Sequelize.STRING(50),
                    allowNull:true,
                    unique:true, // 널 값 끼리는 고유값 적용을 하지 않음
                },
                nick:{
                    type:Sequelize.STRING(30),
                    allowNull:false,
                },
                password:{
                    type:Sequelize.STRING(200),
                    allowNull:true,
                },
                provider:{
                    type:Sequelize.STRING(20),
                    allowNull:false,
                    defaultValue:'local',
                },
                snsid:{
                    type:Sequelize.STRING(30),
                    allowNull:true,
                },
            }, 
            {
               sequelize,
               timestamps:true,
               underscored:false,
               modelName:'User',
               tableName:'users',
               paranoid:true,
               charset:'utf8mb4',
               collate:'utf8mb4_general_ci',
            }
         );
    }
    static associate(db){
         db.User.hasMany(db.Post);
         // hasMany와 belongsTo 사이에 targetKey, sourceKey, foreignKey 들을
         // 지정하지 않으면 hasMany의 주인공 테이블(User)의 기본키가 belongsTo 의 주인공테이블(Post)의 외래키로 삽입됨.
         // 이 때 삽입되는 필드명은 user 테이브르이 id라는 뜻으로 Userid가 됨.
    }
};


