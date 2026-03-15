import { DataTypes } from 'sequelize';
import sequelize from '../src/config/db.js';

const Service = sequelize.define('Service', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: DataTypes.TEXT,
    price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    duration_minutes: DataTypes.INTEGER,
    target_species: DataTypes.ENUM('dog', 'cat', 'both'),
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    image_url: DataTypes.TEXT,
}, {
    tableName: 'services',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

export default Service;
