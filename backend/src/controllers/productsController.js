import Product from "../../models/Product.js";

/* GET /api/products */
export const getProducts = async (req, res) => {
  try {
    const { active, species, category_id } = req.query;

    const where = {};

    if (active !== undefined) {
      where.is_active = active === "true";
    }

    if (species) {
      where.target_species = species;
    }

    if (category_id) {
      where.category_id = category_id;
    }

    const products = await Product.findAll({
      where,
      order: [["created_at", "DESC"]]
    });

    res.json(products);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Get products failed" });
  }
};

/* GET /api/products/:id */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (e) {
    res.status(500).json({ message: "Get product failed" });
  }
};

/* POST /api/products */
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (e) {
    console.error(e);
    res.status(400).json({
      message: "Create product failed",
      error: e.message
    });
  }
};

/* PUT /api/products/:id */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    await product.update({
      ...req.body,
      updated_at: new Date()
    });

    res.json(product);
  } catch (e) {
    console.error(e);
    res.status(400).json({
      message: "Update product failed",
      error: e.message
    });
  }
};

/* DELETE /api/products/:id */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    await product.destroy();

    res.json({ message: "Deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: "Delete product failed" });
  }
};