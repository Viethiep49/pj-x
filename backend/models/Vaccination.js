import { DataTypes } from 'sequelize';
import sequelize from '../src/config/db.js';

const Vaccination = sequelize.define('Vaccination', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    pet_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    vaccine_type_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    administered_by: DataTypes.UUID,
    dose_number: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    vaccination_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    next_due_date: DataTypes.DATEONLY,
    batch_number: DataTypes.STRING(50),
    notes: DataTypes.TEXT,
    status: {
        type: DataTypes.ENUM('scheduled', 'completed', 'missed', 'cancelled'),
        defaultValue: 'completed',
    },
}, {
    tableName: 'vaccinations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

export default Vaccination;
