const { createPost,getAllPosts,getPostById,updatePost,deletePost,searchPosts } = require('../services/post-service');
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
    const postId = req.params.id;
    const { title, content, category } = req.body;
    const featuredImage = req.file ? req.file.path : null;

    const user = req.user;
    if (!user || !user.id) {
        return res.status(400).json({ error: 'Unauthorized - User not authenticated' });
    }

    try {
        const updatedPost = await updatePost(postId, title, content, category, featuredImage);
        res.status(200).json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

exports.deletePostById = async (req, res) => {
    const postId = req.params.id;

    const user = req.user;
    if (!user || !user.id) {
        return res.status(400).json({ error: 'Unauthorized - User not authenticated' });
    }

    try {
        const result = await deletePost(postId);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

exports.searchPosts = async (req, res) => {
    const keyword = req.query.keyword;
    
    const user = req.user;
    if (!user || !user.id) {
        return res.status(400).json({ error: 'Unauthorized - User not authenticated' });
    }

    try {
        const posts = await searchPosts(keyword);
        
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to search posts' });
    }
};
