import Appointment from "../../../models/Appointment.js";

export const confirmAppointment = async (req, res) => {
  const { id } = req.params;

  const appt = await Appointment.findByPk(id);
  if (!appt) return res.status(404).json({ message: "Appointment not found" });

  appt.status = "confirmed";
  await appt.save();

  res.json(appt);
};

export const completeAppointment = async (req, res) => {
  const { id } = req.params;

  const appt = await Appointment.findByPk(id);
  if (!appt) return res.status(404).json({ message: "Appointment not found" });

  appt.status = "completed";
  await appt.save();

  res.json(appt);
};

export const cancelAppointment = async (req, res) => {
  const { id } = req.params;

  const appt = await Appointment.findByPk(id);
  if (!appt) return res.status(404).json({ message: "Appointment not found" });

  appt.status = "cancelled";
  await appt.save();

  res.json(appt);
};
/*
GET /api/admin/appointments
*/
export const getAllAppointmentsForAdmin = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      order: [["appointment_date", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "full_name", "email", "phone_number"]
        },
        {
          model: Pet,
          attributes: ["id", "name", "species"]
        },
        {
          model: Service,
          attributes: ["id", "name", "price"]
        }
      ]
    });

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Get all appointments failed" });
  }
};