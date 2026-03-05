import Pet from "../models/Pet.js";

/**
 * GET /api/pets
 * List pets by owner
 * ?owner_id=uuid
 */
export const getPets = async (req, res) => {
  try {
    const { owner_id } = req.query;

    if (!owner_id) {
      return res.status(400).json({
        success: false,
        message: "owner_id is required",
      });
    }

    const pets = await Pet.findAll({
      where: { owner_id },
      order: [["created_at", "DESC"]],
    });

    res.json({
      success: true,
      count: pets.length,
      data: pets,
    });
  } catch (error) {
    console.error("Get pets error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * POST /api/pets
 * Create pet
 */
export const createPet = async (req, res) => {
  try {
    const pet = await Pet.create(req.body);

    res.status(201).json({
      success: true,
      message: "Pet created",
      data: pet,
    });
  } catch (error) {
    console.error("Create pet error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * PUT /api/pets/:id
 */
export const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }

    await pet.update(req.body);

    res.json({
      success: true,
      message: "Pet updated",
      data: pet,
    });
  } catch (error) {
    console.error("Update pet error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * DELETE /api/pets/:id
 */
export const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }

    await pet.destroy();

    res.json({
      success: true,
      message: "Pet deleted",
    });
  } catch (error) {
    console.error("Delete pet error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};