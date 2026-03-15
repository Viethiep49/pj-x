import { Vaccination, VaccineType, Pet } from '../../models/index.js';

export const getVaccineTypes = async (req, res, next) => {
    try {
        const { species } = req.query;
        const where = species ? { target_species: species } : {};
        const types = await VaccineType.findAll({ where });
        res.json({ success: true, data: types });
    } catch (err) {
        next(err);
    }
};

export const getPetVaccinations = async (req, res, next) => {
    try {
        const pet = await Pet.findByPk(req.params.petId);
        if (!pet) return res.status(404).json({ success: false, message: 'Pet not found' });

        // Non-admin can only see their own pets
        if (req.user.role === 'customer' && pet.owner_id !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        const vaccinations = await Vaccination.findAll({
            where: { pet_id: req.params.petId },
            include: [{ model: VaccineType, as: 'vaccine_type' }],
            order: [['vaccination_date', 'DESC']],
        });
        res.json({ success: true, data: vaccinations });
    } catch (err) {
        next(err);
    }
};

export const createVaccination = async (req, res, next) => {
    try {
        const vaccination = await Vaccination.create({
            ...req.body,
            administered_by: req.user.id,
        });
        res.status(201).json({ success: true, data: vaccination });
    } catch (err) {
        next(err);
    }
};
