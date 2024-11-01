const Post = require('../models/Post');
const path = require('path');
const mongoose = require('mongoose');

exports.createPost = async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    console.log('Received file:', req.file);

    const { content } = req.body;
    
    if (!content || typeof content !== 'string') {
      return res.status(400).json({ message: 'Invalid content. Content must be a non-empty string.' });
    }

    let imagePath = null;
    if (req.file) {
      imagePath = '/' + path.relative('.', req.file.path).replace(/\\/g, '/');
    }

    const post = new Post({
      author: req.user._id,
      content: content.trim(),
      image: imagePath
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error in createPost:', error);
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username avatar').sort('-createdAt');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.likes += 1;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error liking post', error: error.message });
  }
};


exports.createComment = async (req, res) => {
  try {
    // Validate post ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid post ID format' });
    }

    // Find post and ensure it exists
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Validate comment content
    const { content } = req.body;
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return res.status(400).json({ message: 'Invalid comment content' });
    }

    // Create new comment object
    const newComment = {
      _id: new mongoose.Types.ObjectId(), // Explicitly create new ObjectId
      author: req.user._id,
      content: content.trim(),
      createdAt: new Date()
    };

    // Initialize comments array if it doesn't exist
    if (!post.comments) {
      post.comments = [];
    }

    // Add comment to post
    post.comments.push(newComment);
    post.comments_count = post.comments.length;

    // Save post with new comment
    await post.save();

    // Populate author details for the new comment
    const populatedPost = await Post.findById(post._id)
      .populate('comments.author', 'username avatar');

    // Get the newly added comment
    const addedComment = populatedPost.comments[populatedPost.comments.length - 1];

    return res.status(201).json(addedComment);

  } catch (error) {
    console.error('Detailed error:', error);
    return res.status(500).json({
      message: 'Error creating comment',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

exports.getComments = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid post ID format' });
    }

    const post = await Post.findById(req.params.id)
      .populate('comments.author', 'username avatar');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.json(post.comments || []);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({
      message: 'Error fetching comments',
      error: error.message
    });
  }
};