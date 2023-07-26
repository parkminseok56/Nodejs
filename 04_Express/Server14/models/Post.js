const { Sequelize} = require('sequelize');

module.exports = class Post extends Sequelize.Model{
    static init( sequelize ){
         return super.init(
            {   
                // 기본 키 적용된 id(자동 생성), writer(외래키로 생성), 피드내용, 이미지
                content:{
                    type:Sequelize.STRING(200),
                    allowNull:false,
                },
                img:{
                    type:Sequelize.STRING(200),
                    allowNull:true,
                },
            }, 
            {
               sequelize,
               timestamps:true,
               underscored:false,
               modelName:'Post',
               tableName:'posts',
               paranoid:true,
               charset:'utf8mb4',
               collate:'utf8mb4_general_ci',
            }
         );
    }
    static associate(db){
             db.Post.belongsTo( db.User);
    }
};


