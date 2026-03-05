import Product from "../../models/Product.js";

/**
 * POST /api/admin/products
 */
export const createProduct = async (req, res) => {
  try {

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created",
      data: product
    });

  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * PUT /api/admin/products/:id
 */
export const updateProduct = async (req, res) => {
  try {

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    await product.update(req.body);

    res.json({
      success: true,
      message: "Product updated",
      data: product
    });

  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * DELETE /api/admin/products/:id
 */
export const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    await product.destroy();

    res.json({
      success: true,
      message: "Product deleted"
    });

  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};