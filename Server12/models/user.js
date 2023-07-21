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
                comment{
                    type:Sequelize.TEXT,
                    allowNull:true,           
                },
                created_at:{
                    type:Sequelize.DATE,
                    allowNull:true,           
                },
            }
            ,

            {

            }
        );
    }  
    static associate(db){}
};