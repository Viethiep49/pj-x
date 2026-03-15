import { DataTypes } from 'sequelize';
import sequelize from '../src/config/db.js';

const ProductReview = sequelize.define('ProductReview', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 },
    },
    comment: DataTypes.TEXT,
}, {
    tableName: 'product_reviews',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [{
        unique: true,
        fields: ['product_id', 'user_id'],
    }],
});

export default ProductReview;
