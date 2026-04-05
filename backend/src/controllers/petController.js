import { Pet, Breed, Appointment, Service, User } from '../../models/index.js';
import { Op } from 'sequelize';


const resolveBreedId = async (payload, { requireBreed = false } = {}) => {
    // 1. Nếu đã truyền sẵn breed_id thì dùng luôn
    if (payload.breed_id) return payload;

    if (!payload.breed) {
        if (requireBreed) {
            const err = new Error('Breed information is required. Provide either breed_id or a breed name.');
            err.statusCode = 400;
            throw err;
        }
        return payload;
    }

    // 2. Bắt buộc dùng 'let' ở đây (chỉ 1 lần duy nhất)
    let matchedBreed = await Breed.findOne({
        where: {
            [Op.or]: [
                { display_name: payload.breed },
                { name: payload.breed },
            ],
        },
    });

    // 3. Nếu không tìm thấy, tạo mới và gán lại vào biến cũ (TUYỆT ĐỐI KHÔNG thêm let/const ở đây)
    if (!matchedBreed) {
        matchedBreed = await Breed.create({
            name: payload.breed.toLowerCase().trim(),
            display_name: payload.breed.trim(),
            species: payload.species || 'unknown',
            fur_type: payload.fur_length || 'unknown', 
            size_category: 'medium'
        });
    }

    // 4. Gán cả 2 kiểu tên ID để chống lỗi Sequelize
    if (matchedBreed) {
        payload.breed_id = matchedBreed.id; // Cho CSDL
        payload.breedId = matchedBreed.id;  // Cho Model Javascript
    }

    return payload;
};
export const getMyPets = async (req, res, next) => {
    try {
        const pets = await Pet.findAll({
            where: { owner_id: req.user.id },
            include: [
                { 
                    model: Breed, 
                    as: 'breed_info', 
                    attributes: ['display_name', 'species', 'fur_type', 'size_category'] 
                },
                {
                    model: Appointment,
                    as: 'appointments',
                    attributes: ['id', 'appointment_date', 'status', 'notes', 'pet_id', 'service_id'], 
                    include: [{ 
                        model: Service, 
                        as: 'service', 
                        attributes: ['name', 'price', 'duration_minutes'] 
                    }],
                    order: [['appointment_date', 'DESC']],
                    limit: 5,
                    separate: true, 
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
        const payload = await resolveBreedId({ ...req.body, owner_id: req.user.id });
        const pet = await Pet.create(payload);
        res.status(201).json({ success: true, data: pet });
    } catch (err) {
        next(err);
    }
};

export const updatePet = async (req, res, next) => {
    try {
        const pet = await Pet.findOne({ where: { id: req.params.id, owner_id: req.user.id } });
        if (!pet) return res.status(404).json({ success: false, message: 'Pet not found' });

        const payload = await resolveBreedId({ ...req.body }); 
        
        await pet.update(payload);
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
