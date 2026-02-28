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