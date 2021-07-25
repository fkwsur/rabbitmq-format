module.exports = (sequelize, DataTypes) => {
  const chatting = sequelize.define(
    "chatting",
    {
      idx: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement : true
      },
      chatting: {
        type:DataTypes.STRING(1),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      comment: '채팅로그',
    }
    );
  return chatting;
};