// make your schema
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    handphone: DataTypes.STRING,
  },
  {
      // ini untuk penamaan table yg tidak banyak, contoh harusnya brands bukan brand aja
      freezeTableName: true,
      // ini kalau tidak ada field createdAt dan updatedAt
      // timestamps: false,
      paranoid: true,

  })
}