const { createPost, getAllPosts, getPostById, updatePost, deletePost, searchPosts, addComment,getCommentsByPostId,addLike } = require('../services/post-service');
const db = require("../models/index");

exports.createPost = async (req, res) => {
    try {
        const user = req.user;
        const { title, content, category } = req.body;
        const publishDate = new Date();
        const lastUpdated = new Date();
        const featuredImage = req.file;
        if (!user || !user.id) {
            return res.status(400).json({ error: 'Unauthorized - User not authenticated' });
        }

        if (!user) {
            return res.status(400).json({ error: 'User is required' });
        }

        const result = await createPost(user, title, content, user.id, publishDate, lastUpdated, category, featuredImage);
        res.status(200).json({
            message: result.message,
            post: result.post
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

exports.getAllPosts = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const user = req.user;
    if (!user || !user.id) {
        return res.status(400).json({ error: 'Unauthorized - User not authenticated' });
    }

    try {
        const posts = await getAllPosts(page, limit);
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
};

exports.getPostById = async (req, res) => {

    const postId = req.params.id;

    const user = req.user;
    if (!user || !user.id) {
        return res.status(400).json({ error: 'Unauthorized - User not authenticated' });
    }

    try {
        const post = await getPostById(postId);
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            res.status(200).json(post);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve post' });
    }
};

exports.updatePostById = async (req, res) => {

    try {
        const postId = req.params.id;
        const { title, content, category } = req.body;
        const featuredImage = req.file ? req.file.path : null;

        const user = req.user.id;
        if (!user) {
            return res.status(400).json({ error: 'Unauthorized - User not authenticated' });
        }

        const post = await db.post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (user !== post.authorId) {
            return res.status(403).json({ error: 'You can not Update this post because you are not author' });
        }

        const updatedPost = await updatePost(postId, title, content, category, featuredImage);
        res.status(200).json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

exports.deletePostById = async (req, res) => {

    try {
        const postId = req.params.id;

        const user = req.user.id;
        if (!user) {
            return res.status(400).json({ error: 'Unauthorized - User not authenticated' });
        }

        const post = await db.post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (user !== post.authorId) {
            return res.status(403).json({ error: 'You can not delete this post because you are not author' });
        }

        const result = await deletePost(postId);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

exports.searchAllPosts = async (req, res) => {


    try {
        const keyword = req.query.keyword;
        console.log('Search keyword:', keyword);
        // const user = req.user;
        // if (!user || !user.id) {
        //     return res.status(400).json({ error: 'Unauthorized - User not authenticated' });
        // }

        const posts = await searchPosts(keyword);

        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to search posts. Please try again later.' });
    }
};

exports.createComment = async (req, res) => {
    try {
        const { postId, content } = req.body;
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ error: 'Unauthorized - User not authenticated' });
        };

        const comment = await addComment(userId, postId, content);
        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error:error.message });
    }
};

exports.getCommentsByPostId = async (req,res) => {
    try {
        const {postId} = req.params;
        const comments = await getCommentsByPostId(postId);
        res.status(200).json(comments);

    }catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

exports.addLike = async (req, res) => {
    try {
        const {postId} = req.params;
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ error: 'Unauthorized - User not authenticated' });
        };

        const likes = await addLike(userId, postId);
        res.status(200).json({ message: 'Post liked successfully' ,likes});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

