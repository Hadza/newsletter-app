module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING,
      },
    },
    // {
    //   indexes: [
    //     {
    //       unique: true,
    //       fields: ["email"], // you can use multiple columns as well here
    //     },
    //   ],
    // }
  );
  return User;
};
