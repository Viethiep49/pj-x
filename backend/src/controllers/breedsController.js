import Breed from "../models/Breed.js";

// GET /api/breeds
export const getAllBreeds = async (req, res) => {
  try {
    const breeds = await Breed.findAll({
      order: [["display_name", "ASC"]],
    });

    res.status(200).json({
      success: true,
      count: breeds.length,
      data: breeds,
    });
  } catch (error) {
    console.error("Error fetching breeds:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch breeds",
    });
  }
};

// GET /api/breeds/:id
export const getBreedById = async (req, res) => {
  try {
    const { id } = req.params;

    const breed = await Breed.findByPk(id);

    if (!breed) {
      return res.status(404).json({
        success: false,
        message: "Breed not found",
      });
    }

    res.status(200).json({
      success: true,
      data: breed,
    });
  } catch (error) {
    console.error("Error fetching breed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch breed",
    });
  }
};
