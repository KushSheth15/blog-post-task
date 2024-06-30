const express = require('express');
const {createPost,getAllPosts,getPostById,updatePostById,deletePostById,searchPosts} = require('../controllers/post-controller');
const {verifyToken} = require("../middleware/auth-jwt");
const router = express.Router();
const upload  = require('../middleware/upload-image');

router.post('/create', upload.single('image'),verifyToken, createPost);

router.get('/getAll',verifyToken, getAllPosts);

router.get('/:id',verifyToken, getPostById);

router.put('/:id', upload.single('image'),verifyToken, updatePostById);

router.delete('/:id',verifyToken, deletePostById);

router.get('/search',verifyToken, searchPosts);

module.exports = router;