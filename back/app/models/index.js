const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");



const sequelize = new Sequelize({
    database: dbConfig.DB,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./users.js")(sequelize, Sequelize);
db.topics = require("./topics.js")(sequelize, Sequelize);
db.subscriptions = require("./subscriptions.js")(sequelize, Sequelize);
db.newsletter = require("./newsletter.js")(sequelize, Sequelize);

db.users.belongsToMany(db.topics, {through: db.subscriptions, foreignKey: 'user_id'});
db.topics.belongsToMany(db.users, {through: db.subscriptions, foreignKey: 'topic_id'});

db.topics.hasMany(db.newsletter, {foreignKey: 'topic_id'});
db.newsletter.belongsTo(db.topics, {foreignKey: 'topic_id'});


module.exports = db;
