import Service from "../../models/Service.js";

export const getServices = async (req, res) => {
  try {
    const { active, species } = req.query;

    const where = {};

    if (active !== undefined) {
      where.is_active = active === "true";
    }

    if (species) {
      where.target_species = species;
    }

    const services = await Service.findAll({
      where,
      order: [["created_at", "DESC"]]
    });

    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot get services" });
  }
};