const User = require('./User');
const Blog = require('./Blog');


User.hasMany(Blog, {
// multiple blogs can belong to one user
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});


Blog.belongsTo(User, {
// one user can own each project
  foreignKey: 'user_id'
});

module.exports = { User, Blog };
