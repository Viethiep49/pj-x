export const getAllPets = (req, res) => {
  res.status(200).json({ message: "Get all pets" });
}

export const getPetById = (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Get pet with ID: ${id}` });
}

export const createPet = (req, res) => {
  const { name, type } = req.body;
  res.status(201).json({ message: `Create pet with name: ${name} and type: ${type}` });
}

export const updatePet = (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;
  res.status(200).json({ message: `Update pet with ID: ${id}, new name: ${name}, new type: ${type}` });
}

export const deletePet = (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Delete pet with ID: ${id}` });
}

