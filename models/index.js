
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
const User = db.user;
const Post = db.post;

Post.belongsTo(User, { foreignKey: 'authorId' });

module.exports = db;