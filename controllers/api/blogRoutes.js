const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new blog
router.post('/', withAuth, async (req, res) => {
  try {
    // Log request body and session user ID for debugging
    console.log('Request Body:', req.body);
    console.log('Session User ID:', req.session.user_id);

    if (!req.body.name || !req.body.description) {
      res.status(400).json({ message: 'Name and description are required.' });
      return;
    }

    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(400).json(err);
  }
});

// Route to delete a blog
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
