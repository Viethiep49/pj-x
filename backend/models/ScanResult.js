import { DataTypes } from 'sequelize';
import sequelize from '../src/config/db.js';

const ScanResult = sequelize.define('ScanResult', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: DataTypes.UUID,
    pet_id: DataTypes.UUID,
    breed_id: DataTypes.UUID,
    confidence: {
        type: DataTypes.DECIMAL(5, 4),
        allowNull: false,
    },
    image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    top_3_predictions: DataTypes.JSONB,
}, {
    tableName: 'scan_results',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

export default ScanResult;
