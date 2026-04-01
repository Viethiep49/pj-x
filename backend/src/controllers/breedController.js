import { Breed, BreedRecommendation, Product, Service } from '../../models/index.js';

export const getAllBreeds = async (req, res, next) => {
    try {
        const { species, name } = req.query;
        const where = {};
        if (species) where.species = species;
        if (name) where.name = name;
        const breeds = await Breed.findAll({ where, order: [['display_name', 'ASC']] });
        res.json({ success: true, data: breeds });
    } catch (err) {
        next(err);
    }
};

export const getBreedById = async (req, res, next) => {
    try {
        const breed = await Breed.findByPk(req.params.id);
        if (!breed) return res.status(404).json({ success: false, message: 'Breed not found' });
        res.json({ success: true, data: breed });
    } catch (err) {
        next(err);
    }
};

export const getBreedRecommendations = async (req, res, next) => {
    try {
        const breed = await Breed.findByPk(req.params.id);
        if (!breed) return res.status(404).json({ success: false, message: 'Breed not found' });

        const recommendations = await BreedRecommendation.findAll({
            where: { breed_id: req.params.id },
            include: [
                { model: Product, as: 'product', required: false },
                { model: Service, as: 'service', required: false },
            ],
            order: [['priority', 'ASC']],
        });

        const products = recommendations
            .filter(r => r.product)
            .map(r => ({
                ...r.product.toJSON(),
                recommendation_type: r.recommendation_type,
                recommendation_reason: r.recommendation_reason,
            }));

        const services = recommendations
            .filter(r => r.service)
            .map(r => ({
                ...r.service.toJSON(),
                recommendation_type: r.recommendation_type,
                recommendation_reason: r.recommendation_reason,
            }));

        res.json({
            success: true,
            data: { breed, products, services },
        });
    } catch (err) {
        next(err);
    }
};

export const getSmartRecommendations = async (req, res, next) => {
    try {
        const { breedName } = req.query;
        if (!breedName) {
            return res.status(400).json({ success: false, message: 'breedName query parameter is required' });
        }

        // Must find breed ID first because AI Core uses ID in path
        const breed = await Breed.findOne({ where: { name: breedName } });
        
        // Try to fetch from AI Core (Python) for smarter logic (fallbacks etc.)
        if (breed) {
            try {
                const aiCoreUrl = process.env.AICORE_URL || 'http://localhost:8000';
                const response = await fetch(`${aiCoreUrl}/api/ai/recommendations/${breed.id}`);
                const aiData = await response.json();
                
                if (aiData.success) {
                    return res.json({
                        success: true,
                        data: {
                            breed: aiData.breed,
                            products: aiData.recommendations.filter(r => r.product_id).map(r => ({
                                id: r.product_id,
                                name: r.product_name,
                                price: r.price,
                                sale_price: r.sale_price,
                                image_url: r.image_url,
                                slug: r.slug,
                                recommendation_reason: r.recommendation_reason
                            })),
                            services: aiData.recommendations.filter(r => r.service_id).map(r => ({
                                id: r.service_id,
                                name: r.service_name,
                                price: r.service_price,
                                recommendation_reason: r.recommendation_reason
                            })),
                            suggested_products: aiData.suggested_products || []
                        }
                    });
                }
            } catch (aiErr) {
                console.warn("AI Core unreachable, falling back to local basic recommendation:", aiErr.message);
            }
        }

        // Local fallback (Existing basic logic)
        const localBreed = breed || await Breed.findOne({ where: { name: breedName } });
        if (!localBreed) {
            return res.json({ success: true, data: { breed: null, products: [], services: [] } });
        }

        const recommendations = await BreedRecommendation.findAll({
            where: { breed_id: localBreed.id },
            include: [
                { model: Product, as: 'product', required: false },
                { model: Service, as: 'service', required: false },
            ],
            order: [['priority', 'ASC']],
        });

        const products = recommendations.filter(r => r.product).map(r => ({
            ...r.product.toJSON(),
            recommendation_reason: r.recommendation_reason
        }));

        const services = recommendations.filter(r => r.service).map(r => ({
            ...r.service.toJSON(),
            recommendation_reason: r.recommendation_reason
        }));

        res.json({
            success: true,
            data: { breed, products, services },
        });
    } catch (err) {
        next(err);
    }
};

export const createBreed = async (req, res, next) => {
    try {
        const breed = await Breed.create(req.body);
        res.status(201).json({ success: true, data: breed });
    } catch (err) {
        next(err);
    }
};

export const updateBreed = async (req, res, next) => {
    try {
        const breed = await Breed.findByPk(req.params.id);
        if (!breed) return res.status(404).json({ success: false, message: 'Breed not found' });
        await breed.update(req.body);
        res.json({ success: true, data: breed });
    } catch (err) {
        next(err);
    }
};

export const deleteBreed = async (req, res, next) => {
    try {
        const breed = await Breed.findByPk(req.params.id);
        if (!breed) return res.status(404).json({ success: false, message: 'Breed not found' });
        await breed.destroy();
        res.json({ success: true, message: 'Breed deleted' });
    } catch (err) {
        next(err);
    }
};
