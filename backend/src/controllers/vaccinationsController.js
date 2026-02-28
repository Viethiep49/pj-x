import Vaccination from "../../models/Vaccination.js";

/*
GET /api/vaccinations
*/
export const getVaccinations = async (req, res) => {
  try {
    const where = {};

    if (req.query.pet_id) where.pet_id = req.query.pet_id;
    if (req.query.user_id) where.user_id = req.query.user_id;

    const data = await Vaccination.findAll({
      where,
      order: [["vaccination_date", "DESC"]]
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Get vaccinations failed" });
  }
};

/*
POST /api/vaccinations
*/
export const createVaccination = async (req, res) => {
  try {
    const vaccination = await Vaccination.create(req.body);
    res.status(201).json(vaccination);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Create vaccination failed",
      error: err.message
    });
  }
};