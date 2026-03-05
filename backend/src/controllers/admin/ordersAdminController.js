import pool from "../../config/db.js";

export const updateOrderStatus = async (req, res) => {

  const { id } = req.params;
  const { status } = req.body;

  const result = await pool.query(
    `UPDATE orders
     SET status=$1
     WHERE id=$2
     RETURNING *`,
    [status, id]
  );

  res.json(result.rows[0]);
};