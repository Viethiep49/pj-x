import { DataTypes } from 'sequelize';
import sequelize from '../src/config/db.js';

const BreedRecommendation = sequelize.define('BreedRecommendation', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    breed_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    product_id: DataTypes.UUID,
    service_id: DataTypes.UUID,
    recommendation_type: {
        type: DataTypes.ENUM('food', 'toy', 'clothing', 'cage', 'grooming', 'vaccine', 'hygiene'),
        allowNull: false,
    },
    recommendation_reason: DataTypes.TEXT,
    priority: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    tableName: 'breed_recommendations',
    timestamps: false,
});

export default BreedRecommendation;
