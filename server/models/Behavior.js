const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Behavior extends Model { }

Behavior.init(
    {

        name: {
            type: DataTypes.STRING,
            defaultValue: "New Behavior",
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: { model: "User", key: 'id', unique: false },
        },
        phase1: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        phase2: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        phase3: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        date_created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        date_last_updated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        timestamps: true, // Automatically adds createdAt and updatedAt fields
        createdAt: 'date_created', // Alias for createdAt
        updatedAt: 'date_last_updated', // Alias for updatedAt
        freezeTableName: true,
        underscored: true,
        modelName: 'Behavior',
    }
);

module.exports = Behavior;
