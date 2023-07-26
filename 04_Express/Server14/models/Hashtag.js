const { Sequelize} = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model{
    static init( sequelize ){
         return super.init(
            {   
                // 기본키 id, 해시태그 단어
                title:{
                    type:Sequelize.STRING(20),
                    allowNull:false,
                    unique:true,
                },
            }, 
            {
               sequelize,
               timestamps:true,
               underscored:false,
               modelName:'Hashtag',
               tableName:'hashtag',
               paranoid:true,
               charset:'utf8mb4',
               collate:'utf8mb4_general_ci',
            }
         );
    }
    static associate(db){
        db.Post.belongsToMany(db.Hashtag,{through:'PostHasgtag'});
    }
};


