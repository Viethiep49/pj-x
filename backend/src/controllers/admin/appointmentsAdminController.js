import Appointment from "../../models/Appointment.js";

/**
 * PUT /api/admin/appointments/:id
 * confirm / cancel
 */
export const updateAppointmentStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const appointment = await Appointment.findByPk(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    await appointment.update({
      status
    });

    res.json({
      success: true,
      message: "Appointment updated",
      data: appointment
    });

  } catch (error) {
    console.error("Update appointment error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};