const express = require('express');
const {createPost,getAllPosts,getPostById,updatePostById,deletePostById,searchAllPosts,createComment,getCommentsByPostId,addLike} = require('../controllers/post-controller');
const {verifyToken} = require("../middleware/auth-jwt");
const {POST_ROUTES} = require("../constants/endpoint");
const router = express.Router();
const upload  = require('../middleware/upload-image');

router.post(POST_ROUTES.CREATE, upload.single('image'),verifyToken, createPost);

router.get(POST_ROUTES.GET_ALL,verifyToken, getAllPosts);

router.get(POST_ROUTES.GET_BY_ID,verifyToken, getPostById);

router.put(POST_ROUTES.UPDATE_BY_ID, upload.single('image'),verifyToken, updatePostById);

router.delete(POST_ROUTES.DELETE_BY_ID,verifyToken, deletePostById);

router.post(POST_ROUTES.SEARCH, searchAllPosts);

router.post(POST_ROUTES.CREATE_COMMENT,verifyToken,createComment);

router.get(POST_ROUTES.GET_COMMENTS, verifyToken, getCommentsByPostId);

router.post(POST_ROUTES.CREATE_LIKE,verifyToken,addLike);

module.exports = router;