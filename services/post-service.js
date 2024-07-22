const { Op } = require("sequelize");
const db = require("../models/index");
const Post = db.post;
const User = db.user;
const Comment = db.Comment;
const Like = db.like;

const createPost = async (user, title, content, authorId, publishDate, lastUpdated, category, imageFile) => {
    try {

        let featuredImage = '';

        if (imageFile) {
            featuredImage = imageFile.path;
        }

        console.log(featuredImage);

        const post = await Post.create({
            title,
            content,
            authorId,
            publishDate: new Date(publishDate),
            lastUpdated: new Date(lastUpdated),
            category,
            featuredImage
        });

        return { message: 'Post created successfully', post };
    } catch (err) {
        throw err;
    }
};

const getAllPosts = async (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;
        const posts = await Post.findAll({
            offset,
            limit,
            include: [{
                model: User,
                attributes: ['username', 'email']
            }],
            order: [['publishDate', 'DESC']]
        });
        return posts;
    } catch (err) {
        throw err;
    }
}

const getPostById = async (postId) => {
    try {
        const post = await Post.findByPk(postId, {
            include: [{ model: User, attributes: ['username'] }]
        });
        return post;
    } catch (err) {
        throw err;
    }
};

const updatePost = async (postId, title, content, category, featuredImage) => {
    try {
        const post = await Post.findByPk(postId);
        if (!post) {
            throw new Error('Post not found');
        }

        post.title = title;
        post.content = content;
        post.category = category;
        post.featuredImage = featuredImage;
        post.lastUpdated = new Date();

        await post.save();
        return post;
    } catch (err) {
        throw err;
    }
};

const deletePost = async (postId) => {
    try {
        const post = await Post.findByPk(postId);
        if (!post) {
            throw new Error('Post not found');
        }

        await post.destroy();
        return { message: 'Post deleted successfully' };
    } catch (err) {
        throw err;
    }
};

const searchPosts = async (search) => {

    try {
        
        const searchFilter = search ? { title: { [Op.iLike]: `%${search}%` } } : {};
        
        const posts = await Post.findAll({
            where: searchFilter,
            include: [{ model: User, attributes: ['username', 'email'] }],
            // order: [['publishDate', 'DESC']]
        });
        return posts;
    } catch (err) {
        console.error('Error searching posts:', err.message);
        console.error('Error stack:', err.stack);
        throw err;
    }
};

const addComment = async (userId,postId,content) =>{
    try {
        const newComment = await Comment.create({
            userId,
            postId,
            content
        });

        return newComment;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getCommentsByPostId = async (postId) => {
    try {
        const comments = await Comment.findAll({
            where: { postId },
            include: [{ model: User,as:'user', attributes: ['username'] }]
        });
        return comments;
    } catch (error) {
        throw new Error(error.message);
    };
};

const addLike = async (userId,postId)=>{
    try{
        const existingLike = await Like.findOne({
            where: { userId, postId }
        });
        if(existingLike){
            throw new Error('User has already liked this post');
        };


        const newLike = await Like.create({ userId, postId });

        await Post.increment('likesCount', {where:{id:postId}});

        return newLike;
    }catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    searchPosts,
    addComment,
    getCommentsByPostId,
    addLike
}