module.exports = (sequelize, DataTypes) => {
  const Newsletter = sequelize.define("newsletter", {
    status: {
      type: DataTypes.STRING,
      defaultValue: "draft",
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    content_url: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  });
  return Newsletter;
};
