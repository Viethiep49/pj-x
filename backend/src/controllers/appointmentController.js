import { Op } from 'sequelize';
import { Appointment, Pet, Service, User } from '../../models/index.js';

export const getMyAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.findAll({
            where: { user_id: req.user.id },
            include: [
                { model: Pet, as: 'pet', attributes: ['name', 'species', 'breed'] },
                { model: Service, as: 'service', attributes: ['name', 'price', 'duration_minutes'] },
            ],
            order: [['appointment_date', 'DESC']],
        });
        res.json({ success: true, data: appointments });
    } catch (err) {
        next(err);
    }
};

export const createAppointment = async (req, res, next) => {
    try {
        const { pet_id, service_id, appointment_date, notes } = req.body;

        // Ownership check
        const pet = await Pet.findOne({ where: { id: pet_id, owner_id: req.user.id } });
        if (!pet) return res.status(403).json({ success: false, message: 'Pet does not belong to you' });

        const appointment = await Appointment.create({
            user_id: req.user.id,
            pet_id,
            service_id,
            appointment_date,
            notes,
        });

        res.status(201).json({ success: true, data: appointment });
    } catch (err) {
        next(err);
    }
};

export const getAvailableSlots = async (req, res, next) => {
    try {
        const { date } = req.query;
        const allSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

        if (!date) return res.json({ success: true, data: allSlots });

        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);

        const booked = await Appointment.findAll({
            where: {
                appointment_date: { [Op.between]: [dayStart, dayEnd] },
                status: { [Op.in]: ['pending', 'confirmed'] },
            },
        });

        const bookedHours = booked.map(a => {
            const d = new Date(a.appointment_date);
            return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
        });

        const available = allSlots.filter(s => !bookedHours.includes(s));
        res.json({ success: true, data: available });
    } catch (err) {
        next(err);
    }
};

export const getAllAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.findAll({
            include: [
                { model: User, as: 'customer', attributes: ['full_name', 'email', 'phone_number'] },
                { model: Pet, as: 'pet', attributes: ['name', 'species', 'breed'] },
                { model: Service, as: 'service', attributes: ['name', 'price'] },
            ],
            order: [['appointment_date', 'ASC']],
        });
        res.json({ success: true, data: appointments });
    } catch (err) {
        next(err);
    }
};

export const adminCreateAppointment = async (req, res, next) => {
    try {
        const { user_id, pet_id, service_id, appointment_date, notes } = req.body;

        const appointment = await Appointment.create({
            user_id,
            pet_id,
            service_id,
            appointment_date,
            notes,
            status: 'confirmed' // Admin bookings auto-confirm
        });

        res.status(201).json({ success: true, data: appointment });
    } catch (err) {
        next(err);
    }
};

export const updateAppointmentStatus = async (req, res, next) => {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });
        await appointment.update({ status: req.body.status });
        res.json({ success: true, data: appointment });
    } catch (err) {
        next(err);
    }
};
