// routes/index.js
const chickenRoutes = require('./chicken_routes');
module.exports = function(app, db) {
  chickenRoutes(app, db);
  // Other route groups could go here, in the future
};