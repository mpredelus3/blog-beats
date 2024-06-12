const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

// Route to render the homepage
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render individual blog pages
router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;

    const blogData = await Blog.findAll({
      where: { user_id: userId },
      include: [{ model: User, attributes: ['name'] }]
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('profile', { 
      blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to render the login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

// Update views count
router.put('/views/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    blog.views++;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update likes count
router.put('/likes/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    blog.likes++;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
