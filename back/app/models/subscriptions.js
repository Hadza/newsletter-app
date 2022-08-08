module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define("subscription", {
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
  return Subscription;
};
