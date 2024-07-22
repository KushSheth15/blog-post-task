const db = require('../models/index');
const User = db.user;

module.exports = (sequelize, DataTypes) => {
const Post = sequelize.define('posts', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    publishDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    lastUpdated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    featuredImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    likesCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

return Post;
};