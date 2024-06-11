const User = require('./User');
const Project = require('./Project');

// multiple projects can belong to one user
User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// one user can own each project
Project.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Project };
