const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model { }

Game.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            references: { model: 'User', key: 'id', unique: false },
            allowNull: false,
        },

        round: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        orderDelay: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        manufacturerDelay: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        selectedRole: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        rounds: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        last_date_updated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },

        history: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        createdAt: 'date_created', // Alias for createdAt
        updatedAt: 'date_last_updated', // Alias for updatedAt
        freezeTableName: true,
        underscored: true,
        modelName: 'Game',
    }
);

module.exports = Game;
