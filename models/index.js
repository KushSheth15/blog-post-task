
const dbConfig = require("../config/db");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false,
});

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user-model")(sequelize, Sequelize);
db.post = require("./post-model")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);
db.like = require("./likes")(sequelize, Sequelize);

const User = db.user;
const Post = db.post;
const Comment = db.Comment;
const Like = db.like;

Post.belongsTo(User, { foreignKey: 'authorId' });

User.hasMany(Comment,{ foreignKey: 'userId' });

Post.hasMany(Comment,{ foreignKey: 'postId' });

Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Post.hasMany(Like,{ foreignKey: 'postId' });

Like.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = db;