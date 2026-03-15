import { DataTypes } from 'sequelize';
import sequelize from '../src/config/db.js';

const ProductCategory = sequelize.define('ProductCategory', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    icon: DataTypes.STRING(50),
    description: DataTypes.TEXT,
    display_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    tableName: 'product_categories',
    timestamps: false,
});

export default ProductCategory;
