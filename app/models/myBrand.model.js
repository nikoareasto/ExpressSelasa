// make your schema
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("brand", {
      brand_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
      },
      name: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAT: DataTypes.DATE,
    },
    {
        // ini untuk penamaan table yg tidak banyak, contoh harusnya brands bukan brand aja
        freezeTableName: true,
        // ini kalau tidak ada field createdAt dan updatedAt
        // timestamps: false,
        paranoid: true,

    })
}