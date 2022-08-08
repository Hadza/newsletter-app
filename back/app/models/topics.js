module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define("topic", {
    name: {
      type: DataTypes.STRING,
    },
  });
  return Topic;
};
