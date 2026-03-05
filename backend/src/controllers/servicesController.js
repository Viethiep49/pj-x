import Service from "../models/Service.js";

/**
 * @desc    Get all active services
 * @route   GET /api/services
 * @access  Public
 */
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      where: { is_active: true },
      order: [["created_at", "DESC"]],
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "duration_minutes",
        "target_species",
        "image_url"
      ]
    });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    console.error("Get services error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};