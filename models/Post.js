const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model{}


Post.init(

    {
        id: {

            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        post_title: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        post_content: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        date_created: {
            type:DataTypes.DATE,
        },
        user_id: {
            type:DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        underscored: false,
        freezeTableName: true,
        modelName: 'post',
    },
);


module.exports = Post;