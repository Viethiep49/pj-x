import { DataTypes } from 'sequelize';
import sequelize from '../src/config/db.js';

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    category_id: DataTypes.UUID,
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
    },
    description: DataTypes.TEXT,
    price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    sale_price: DataTypes.DECIMAL(12, 2),
    stock_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    sku: {
        type: DataTypes.STRING(50),
        unique: true,
    },
    image_url: DataTypes.TEXT,
    images: {
        type: DataTypes.JSONB,
        defaultValue: [],
    },
    target_species: DataTypes.ENUM('dog', 'cat', 'both'),
    target_fur_type: DataTypes.ENUM('short', 'long', 'all'),
    target_size: DataTypes.ENUM('small', 'medium', 'large', 'all'),
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    rating_avg: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0,
    },
    rating_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default Product;
