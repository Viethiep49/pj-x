import { Op } from 'sequelize';
import { Product, ProductCategory, ProductReview, User } from '../../models/index.js';

export const getAllProducts = async (req, res, next) => {
    try {
        const { species, fur_type, size, category_id, search } = req.query;
        const where = { is_active: true };

        if (species) where.target_species = { [Op.in]: [species, 'both'] };
        if (fur_type) where.target_fur_type = { [Op.in]: [fur_type, 'all'] };
        if (size) where.target_size = { [Op.in]: [size, 'all'] };
        if (category_id) where.category_id = category_id;
        if (search) where.name = { [Op.iLike]: `%${search}%` };

        const products = await Product.findAll({
            where,
            include: [{ model: ProductCategory, as: 'category', attributes: ['name', 'slug', 'icon'] }],
            order: [['created_at', 'DESC']],
        });
        res.json({ success: true, data: products });
    } catch (err) {
        next(err);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [
                { model: ProductCategory, as: 'category' },
                {
                    model: ProductReview, as: 'reviews',
                    include: [{ model: User, as: 'reviewer', attributes: ['full_name', 'avatar_url'] }],
                    limit: 10,
                    order: [['created_at', 'DESC']],
                },
            ],
        });
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const {
            name, slug, description, price, sale_price, stock_quantity,
            category_id, target_species, target_fur_type, target_size,
            image_url, is_active
        } = req.body;

        const payload = {
            name, slug, description, price, sale_price, stock_quantity,
            category_id, target_species, target_fur_type, target_size,
            image_url, is_active
        };
        const cleanPayload = Object.fromEntries(Object.entries(payload).filter(([_, v]) => v !== undefined));

        const product = await Product.create(cleanPayload);
        res.status(201).json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

        const {
            name, slug, description, price, sale_price, stock_quantity,
            category_id, target_species, target_fur_type, target_size,
            image_url, is_active
        } = req.body;

        const payload = {
            name, slug, description, price, sale_price, stock_quantity,
            category_id, target_species, target_fur_type, target_size,
            image_url, is_active
        };
        const cleanPayload = Object.fromEntries(Object.entries(payload).filter(([_, v]) => v !== undefined));

        await product.update(cleanPayload);
        res.json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        await product.destroy();
        res.json({ success: true, message: 'Product deleted' });
    } catch (err) {
        next(err);
    }
};

export const addReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;
        const review = await ProductReview.create({
            product_id: req.params.id,
            user_id: req.user.id,
            rating,
            comment,
        });

        // Update rating average
        const reviews = await ProductReview.findAll({ where: { product_id: req.params.id } });
        const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        await Product.update(
            { rating_avg: avg.toFixed(2), rating_count: reviews.length },
            { where: { id: req.params.id } }
        );

        res.status(201).json({ success: true, data: review });
    } catch (err) {
        next(err);
    }
};
