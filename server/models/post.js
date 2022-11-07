const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

module.exports = {
  Post: sequelize.define("post", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrememt: true,
      allowNull: false,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    pricateStatus: DataTypes.BOOLEAN,
  }),
};
