import { DataTypes } from 'sequelize';
import sequelize from '../src/config/db.js';

const VaccineType = sequelize.define('VaccineType', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    target_species: DataTypes.ENUM('dog', 'cat'),
    description: DataTypes.TEXT,
    recommended_age_months: DataTypes.INTEGER,
    interval_days: DataTypes.INTEGER,
    doses_required: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
}, {
    tableName: 'vaccine_types',
    timestamps: false,
});

export default VaccineType;
