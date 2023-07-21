// node가 sequlize 를 이용해서 mySql에 테이블을 생성하거나 조작할 수 있는 "테이블 모델"을 만듬.
const Sequelize = require('sequelize');

// 테이블 모델을 class 형식으로 정의함.
// class 모델이름{ };

// 테이블을 위한 클래스 제작 시 Sequelize에서 제공되는 Model을 Exrtedns하여 제작함.
// class 모델이름 extends Sequelize.Model{ };

// 그리고, 그 클래스가 exports 되서 index에서 require 해서 테이블을 생성함.
// module.exports = class 모델이름 extends Sequelize.Model{};
// 모델이름 : 테이블 이름과 같을 수도 있고, 다를 수도 있음. 모델 이름은 node에서 테이블을 제어하기 위한 이름임.

/*
module.exports = class User extends Sequelize.Model {
     // 테이블을 생성(필드생성)하고 초기화 하는 함수
     static init( sequelize ){}  // 호출할 때 sequelize가 전달될 예정
     // 테이블 간 관계 설정 함수
     static associate(db){}
};
*/

// 외부에서 User를 require하고 , User.init( Sequelize); 이와 같이 호출될 예정임.

module.exports = class User extends Sequelize.Model {
    static init( sequelize ){
        return super.init(
            {
                // 필드들이 정의됨.
                // 별도의 언급이 없으면, 기본 키속성의 자동즈가 숫자를 대상으로 하는 id하는 필드가 자동 생성됨.
                name:{
                    type:Sequelize.STRING(20),
                    allowNull:false,  // 널 허용  여부
                    unique:false,     // 중복 가능 여부
                },
                age:{
                    type:Sequelize.INTEGER.UNSIGNED,
                    allowNull:false,
                },
                married:{
                    type:Sequelize.BOOLEAN,
                    allowNull:true,           
                },
                comment:{
                    type:Sequelize.TEXT,
                    allowNull:true,           
                },
                created_at:{
                    type:Sequelize.DATE,
                    allowNull:true,           
                },
            },
            {
                // 테이블의 옵션들이 객체형식으로 정의됨.
                sequelize, // init 함수의 매개변수에 전달된 sequelize
                timestamps:false, // 이 속성이 true이면, createdAt, updatedAt 필드를 자동 생성함.
                underscored:false,  // 이 속성이 true이면, createdAt, updatedAt 필드의 이름이
                // created_at, updated_at으로 바뀜.
                modelName : 'User', // Sequelize가 사용할 모델(테이블)의 이름
                tableName: 'user', // mysql 데이터베이스 자체 테이블의 이름
                paranoid:false, // 이 속성이 true이면, deleteAt 필드가 생성됨.
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }  
    static associate(db){
            db.User.hasMany(db.Comment,{ sourcekey:'id', foreignkey:'commenter'} );
            // User 모델의 필드값이 Comment 모델에 같은 필드값으로 여러 번 나오도록 설정(1:N 관계)
    }
};