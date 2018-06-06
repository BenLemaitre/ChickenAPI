// routes/index.js
const puppetRoutes = require('./puppet_routes');
const choregraphyRoutes = require('./choregraphy_routes');
const movementRoutes = require('./movement_routes');
module.exports = function(app, db) {
  puppetRoutes(app, db);
  choregraphyRoutes(app, db);
  movementRoutes(app, db);
};
