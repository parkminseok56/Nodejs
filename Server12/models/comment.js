const Sequelize = require('sequelize')

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      // 4개의 필드가 생성 됨
      // id(기본키의 고유 번호), commenter(글쓴이), comment(글 내용), created_at(작성날짜)
      // id는 별도의언급이 없으면 증가되는 고유숫자로 구성된 필드로 자동생성 

      // commenter : 글쓴사람의 id, users테이블의 id 값과 외래키 관계임 따로 commenter 필드를 만들고 외래키 설정을 하는게 아니라,
      // 외래키 설정하면 자동으로 필드가 삽입됨
      comment: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Comment',
      tableName: 'comments',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    })
  }
  static associate(db) {
    // comment 테이블의 commenter 와 user 의 id 와 외래키
    db.Comment.belongsTo(db.User, { targetKey: 'id', foreignKey: 'commenter' })
    // comment 테이블이 user 테이블의 id 값으로 commenter 필드를 참조합니다


  }
}