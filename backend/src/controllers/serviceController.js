import { Service } from '../../models/index.js';

export const getAllServices = async (req, res, next) => {
    try {
        const services = await Service.findAll({
            where: { is_active: true },
            order: [['price', 'ASC']],
        });
        res.json({ success: true, data: services });
    } catch (err) {
        next(err);
    }
};
