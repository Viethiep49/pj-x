import Pet from "../../models/Pet.js";

/* GET /api/pets */
export const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.findAll();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* POST /api/pets */
export const createPet = async (req, res) => {
  try {
    const pet = await Pet.create(req.body);
    res.status(201).json(pet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* PUT /api/pets/:id */
export const updatePet = async (req, res) => {
  try {
    const { id } = req.params;

    const pet = await Pet.findByPk(id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    await pet.update(req.body);
    res.json(pet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* DELETE /api/pets/:id */
export const deletePet = async (req, res) => {
  try {
    const { id } = req.params;

    const pet = await Pet.findByPk(id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    await pet.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};