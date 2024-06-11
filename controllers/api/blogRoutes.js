const express = require('express');
const router = express.Router();

// Mock data and user
const blogs = [];
const user = {
  name: "John Doe",
  email: "john@example.com"
};

// GET route to fetch all blogs
router.get('/', (req, res) => {
  res.json(blogs);
});

// POST route to create a new blog
router.post('/', (req, res) => {
  const { name, description } = req.body;
  const newBlog = {
    id: blogs.length + 1,
    name,
    description,
    user,
    date_created: new Date()
  };
  blogs.push(newBlog);
  res.status(201).json(newBlog);
});

// DELETE route to delete a blog by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = blogs.findIndex(blog => blog.id == id);
  if (index !== -1) {
    blogs.splice(index, 1);
    res.status(200).json({ message: 'Blog deleted' });
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
});

module.exports = router;
