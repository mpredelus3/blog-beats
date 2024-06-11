const sequelize = require('../config/connection');
const { User, Project } = require('../models');

// imports the user and project data
const userData = require('./userData.json');
const projectData = require('./projectData.json');

// function to seed the database with user and project data
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

// runs the seed function
seedDatabase();
