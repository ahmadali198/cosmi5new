const express = require('express');
const Post = require('../models/Post');
const requireAuth = require('../middleware/middleware');

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().populate('author', 'name email');
  res.json(posts);
});

// ✅ Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: 'Invalid post ID' });
  }
});

// Create post
router.post('/', requireAuth, async (req, res) => {
  const { title, content } = req.body;
  const newPost = await Post.create({ title, content, author: req.user.userId });
  res.json(newPost);
});

// Update post
router.put('/:id', requireAuth, async (req, res) => {
  const { title, content } = req.body;
  const updated = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
  res.json(updated);
});

// Delete post
router.delete('/:id', requireAuth, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
});

module.exports = router;
