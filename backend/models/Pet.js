import { DataTypes } from 'sequelize';
import sequelize from '../src/config/db.js';

const Pet = sequelize.define('Pet', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    owner_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    breed_id: DataTypes.UUID,
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    species: {
        type: DataTypes.ENUM('dog', 'cat'),
        allowNull: false,
    },
    breed: DataTypes.STRING(100),
    fur_length: DataTypes.ENUM('short', 'medium', 'long', 'hairless'),
    weight: DataTypes.DECIMAL(5, 2),
    gender: DataTypes.ENUM('male', 'female'),
    age: DataTypes.INTEGER,
    image_url: DataTypes.TEXT,
    medical_history: DataTypes.TEXT,
}, {
    tableName: 'pets',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default Pet;
