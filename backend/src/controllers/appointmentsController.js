import { Op } from "sequelize";
import Appointment from "../../models/Appointment.js";

/* GET /api/appointments */
export const getAppointments = async (req, res) => {
  try {
    const where = {};

    if (req.query.user_id) where.user_id = req.query.user_id;
    if (req.query.pet_id) where.pet_id = req.query.pet_id;
    if (req.query.status) where.status = req.query.status;

    const data = await Appointment.findAll({
      where,
      order: [["appointment_date", "DESC"]]
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Get appointments failed" });
  }
};

/* GET /api/appointments/:id */
export const getAppointmentById = async (req, res) => {
  try {
    const apm = await Appointment.findByPk(req.params.id);

    if (!apm)
      return res.status(404).json({ message: "Appointment not found" });

    res.json(apm);
  } catch (err) {
    res.status(500).json({ message: "Get appointment failed" });
  }
};

/* POST /api/appointments */
export const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Create appointment failed",
      error: err.message
    });
  }
};

/* PUT /api/appointments/:id */
export const updateAppointment = async (req, res) => {
  try {
    const apm = await Appointment.findByPk(req.params.id);

    if (!apm)
      return res.status(404).json({ message: "Appointment not found" });

    await apm.update({
      ...req.body,
      updated_at: new Date()
    });

    res.json(apm);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Update appointment failed",
      error: err.message
    });
  }
};

/*
GET /api/appointments/slots?date=YYYY-MM-DD
*/
export const getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "date is required (YYYY-MM-DD)" });
    }

    const startHour = 8;
    const endHour = 17;
    const slotMinutes = 30;

    const dayStart = new Date(`${date}T00:00:00`);
    const dayEnd = new Date(`${date}T23:59:59`);

    const appointments = await Appointment.findAll({
      where: {
        appointment_date: {
          [Op.between]: [dayStart, dayEnd]
        },
        status: {
          [Op.notIn]: ["cancelled"]
        }
      },
      attributes: ["appointment_date"]
    });

    const booked = appointments.map(a =>
      new Date(a.appointment_date).getTime()
    );

    const slots = [];
    const base = new Date(`${date}T00:00:00`);

    for (let h = startHour; h < endHour; h++) {
      for (let m = 0; m < 60; m += slotMinutes) {
        const slot = new Date(base);
        slot.setHours(h, m, 0, 0);

        const slotTime = slot.getTime();

        const isBooked = booked.some(t => t === slotTime);

        if (!isBooked) {
          slots.push(slot.toISOString());
        }
      }
    }

    res.json({
      date,
      slot_minutes: slotMinutes,
      slots
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Get available slots failed" });
  }
};