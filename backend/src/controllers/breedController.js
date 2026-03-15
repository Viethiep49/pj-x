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
