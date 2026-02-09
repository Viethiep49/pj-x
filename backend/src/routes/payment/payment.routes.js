const express = require('express');
const router = express.Router();

const processPayment = (req, res) => {
    const { amount, method } = req.body;

    // Simulate processing time
    setTimeout(() => {
        // 90% success rate
        const isSuccess = Math.random() < 0.9;

        if (isSuccess) {
            res.status(200).json({
                success: true,
                transactionId: `txn_${Date.now()}`,
                message: `Payment of ${amount} via ${method} successful`
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment failed due to insufficient funds (Mock)'
            });
        }
    }, 1000);
};

router.post('/process', processPayment);

module.exports = router;
