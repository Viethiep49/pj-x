import { DataTypes } from 'sequelize';
import sequelize from '../src/config/db.js';

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    appointment_id: DataTypes.UUID,
    order_id: DataTypes.UUID,
    payment_type: {
        type: DataTypes.ENUM('appointment', 'order'),
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    payment_method: DataTypes.STRING(50),
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
        defaultValue: 'pending',
    },
    transaction_id: DataTypes.STRING(100),
    transaction_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'payments',
    timestamps: false,
});

export default Payment;
