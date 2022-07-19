require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false
});
const db = {};

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf(".") !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.topics.hasMany(db.comments, { foreignKey: { allowNull: false }, onDelete: 'cascade' });
db.comments.belongsTo(db.topics);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
