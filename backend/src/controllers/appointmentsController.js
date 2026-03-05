import Appointment from "../models/Appointment.js";

/**
 * POST /api/appointments
 * Create appointment
 */
export const createAppointment = async (req, res) => {
  try {
    const { user_id, pet_id, service_id, appointment_time, notes } = req.body;

    const appointment = await Appointment.create({
      user_id,
      pet_id,
      service_id,
      appointment_time,
      notes
    });

    res.status(201).json({
      success: true,
      message: "Appointment created",
      data: appointment
    });

  } catch (error) {
    console.error("Create appointment error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET /api/appointments
 * User booking history
 */
export const getAppointments = async (req, res) => {
  try {

    const { user_id } = req.query;

    const where = {};

    if (user_id) where.user_id = user_id;

    const appointments = await Appointment.findAll({
      where,
      order: [["appointment_time", "DESC"]]
    });

    res.json({
      success: true,
      count: appointments.length,
      data: appointments
    });

  } catch (error) {
    console.error("Get appointments error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET /api/appointments/slots
 * Get available time slots
 */
export const getAvailableSlots = async (req, res) => {
  try {

    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required"
      });
    }

    const booked = await Appointment.findAll({
      where: {
        appointment_time: date
      }
    });

    const bookedTimes = booked.map(a => a.appointment_time);

    const allSlots = [
      "09:00",
      "10:00",
      "11:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00"
    ];

    const available = allSlots.filter(slot => {
      return !bookedTimes.some(t => t.includes(slot));
    });

    res.json({
      success: true,
      date,
      slots: available
    });

  } catch (error) {
    console.error("Get slots error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};