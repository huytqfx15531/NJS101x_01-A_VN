const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "040199", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;