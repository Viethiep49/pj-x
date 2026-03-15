import { DataTypes } from 'sequelize';
import sequelize from '../src/config/db.js';

const Breed = sequelize.define('Breed', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    display_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    species: {
        type: DataTypes.ENUM('dog', 'cat'),
        allowNull: false,
    },
    fur_type: {
        type: DataTypes.ENUM('short', 'medium', 'long', 'hairless'),
        allowNull: false,
    },
    size_category: DataTypes.ENUM('small', 'medium', 'large'),
    description: DataTypes.TEXT,
    image_url: DataTypes.TEXT,
}, {
    tableName: 'breeds',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

export default Breed;
