module.exports = (sequelize, DataTypes) => {
    const Newsletter = sequelize.define("Newsletter", {
        status: {
            type: DataTypes.STRING
        },
        content_url: {
            type: DataTypes.STRING
        },
    });
    return Newsletter;
};
