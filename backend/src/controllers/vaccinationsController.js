import Vaccination from "../models/Vaccination.js";
import VaccineType from "../models/VaccineType.js";

// GET /api/vaccinations/:petId
export const getVaccinationsByPet = async (req, res) => {
  try {
    const { petId } = req.params;

    const vaccinations = await Vaccination.findAll({
      where: { pet_id: petId },
      include: [
        {
          model: VaccineType,
          attributes: ["id", "name"],
        },
      ],
      order: [["vaccination_date", "DESC"]],
    });

    res.json({
      success: true,
      count: vaccinations.length,
      data: vaccinations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/**
* POST /api/vaccinations
 * [Staff] Record vaccination
 */
export const createVaccination = async (req, res) => {
  try {
    const {
      pet_id,
      vaccine_type_id,
      administered_by,
      dose_number,
      vaccination_date,
      next_due_date,
      batch_number,
      notes,
      status
    } = req.body;

    const vaccination = await Vaccination.create({
      pet_id,
      vaccine_type_id,
      administered_by,
      dose_number,
      vaccination_date,
      next_due_date,
      batch_number,
      notes,
      status: status || "completed"
    });

    res.status(201).json({
      success: true,
      message: "Vaccination recorded successfully",
      data: vaccination
    });

  } catch (error) {
    console.error("Create vaccination error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};