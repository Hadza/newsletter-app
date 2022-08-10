module.exports = {
    HOST: "db",
    USER: "postgres",
    PASSWORD: "docker",
    DB: "newsletter",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
