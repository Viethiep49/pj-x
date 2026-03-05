import Product from "../models/Product.js";

/**
 * GET /api/products
 */
export const getProducts = async (req, res) => {
  try {
    const { species, fur, size } = req.query;

    const where = { is_active: true };

    if (species) where.target_species = species;
    if (fur) where.target_fur_type = fur;
    if (size) where.target_size = size;

    const products = await Product.findAll({
      where,
      order: [["created_at", "DESC"]],
    });

    res.json({
      success: true,
      count: products.length,
      data: products,
    });

  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET /api/products/:id
 */
export const getProductById = async (req, res) => {
  try {

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * POST /api/products/:id/reviews
 */
export const addProductReview = async (req, res) => {
  try {

    const { rating } = req.body;

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const newCount = product.rating_count + 1;

    const newAvg =
      (product.rating_avg * product.rating_count + rating) / newCount;

    await product.update({
      rating_avg: newAvg,
      rating_count: newCount
    });

    res.json({
      success: true,
      message: "Review added",
      rating_avg: newAvg,
      rating_count: newCount
    });

  } catch (error) {
    console.error("Review error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};