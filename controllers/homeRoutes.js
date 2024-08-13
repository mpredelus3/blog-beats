const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

// Homepage route
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Single project route
router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged-in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    // Log userData and userData.Projects to inspect them
    console.log('userData:', userData);
    console.log('userData.Projects:', userData ? userData.Projects : 'No projects found');

    // Serialize the data; if no projects, return an empty array
    const projects = userData.Projects ? userData.Projects.map((project) => project.get({ plain: true })) : [];

    // Pass the serialized data to the profile template
    res.render('profile', {
      projects,  // Pass the projects to the template
      logged_in: true,
      name: userData.name, // Pass the user's name to the template
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    return res.redirect('/profile');
  }

  res.render('login');
});

module.exports = router;
