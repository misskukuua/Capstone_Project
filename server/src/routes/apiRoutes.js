const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createPost, getPosts, likePost, createComment, getComments } = require('../controllers/postController');
const { updateProfile, getProfile } = require('../controllers/userController');
const upload = require('../middleware/upload');

// Post routes
router.post('/posts/create', authMiddleware, upload.single('image'), createPost);
router.get('/posts', getPosts);
router.post('/posts/:id/like', authMiddleware, likePost);

// Profile routes
router.get('/profile/:username', getProfile);
router.put('/profile', authMiddleware, updateProfile);

// Comment routes
router.post('/posts/:id/comment', authMiddleware, createComment);
router.get('/posts/:id/comments', getComments);



module.exports = router;