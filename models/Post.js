const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    caption: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    upload: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
     type: Sequelize.DATEONLY
    },
    updated_at: {
      type: Sequelize.DATEONLY
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'Post'
  }
);

module.exports = Post;
