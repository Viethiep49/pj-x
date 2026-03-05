import VaccineType from "../models/VaccineType.js";

/**
 * GET /api/vaccine-types
 * List all vaccine types
 */
export const getVaccineTypes = async (req, res) => {
  try {
    const vaccines = await VaccineType.findAll({
      order: [["name", "ASC"]],
    });

    res.json({
      success: true,
      count: vaccines.length,
      data: vaccines,
    });
  } catch (error) {
    console.error("Get vaccine types error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};