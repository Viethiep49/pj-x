import { Pet, Breed, Appointment, Service } from '../../models/index.js';

export const getMyPets = async (req, res, next) => {
    try {
        const pets = await Pet.findAll({
            where: { owner_id: req.user.id },
            include: [
                { model: Breed, as: 'breed_info', attributes: ['display_name', 'species', 'fur_type', 'size_category'] },
                {
                    model: Appointment,
                    as: 'appointments',
                    attributes: ['id', 'appointment_date', 'status', 'notes'],
                    include: [{ model: Service, as: 'service', attributes: ['name', 'price', 'duration_minutes'] }],
                    order: [['appointment_date', 'DESC']],
                    required: false,
                },
            ],
            order: [['created_at', 'DESC']],
        });
        res.json({ success: true, data: pets });
    } catch (err) {
        next(err);
    }
};

export const getAllPets = async (req, res, next) => {
    try {
        const pets = await Pet.findAll({
            include: [
                { model: User, as: 'owner', attributes: ['full_name', 'email'] },
                { model: Breed, as: 'breed_info', attributes: ['display_name'] },
            ],
            order: [['created_at', 'DESC']],
        });
        res.json({ success: true, data: pets });
    } catch (err) {
        next(err);
    }
};

export const createPet = async (req, res, next) => {
    try {
        const pet = await Pet.create({ ...req.body, owner_id: req.user.id });
        res.status(201).json({ success: true, data: pet });
    } catch (err) {
        next(err);
    }
};

export const updatePet = async (req, res, next) => {
    try {
        const pet = await Pet.findOne({ where: { id: req.params.id, owner_id: req.user.id } });
        if (!pet) return res.status(404).json({ success: false, message: 'Pet not found' });
        await pet.update(req.body);
        res.json({ success: true, data: pet });
    } catch (err) {
        next(err);
    }
};

export const deletePet = async (req, res, next) => {
    try {
        const pet = await Pet.findOne({ where: { id: req.params.id, owner_id: req.user.id } });
        if (!pet) return res.status(404).json({ success: false, message: 'Pet not found' });
        await pet.destroy();
        res.json({ success: true, message: 'Pet deleted' });
    } catch (err) {
        next(err);
    }
};
