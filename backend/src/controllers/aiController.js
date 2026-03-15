import { ScanResult } from '../models/index.js';

/**
 * @route   POST /api/ai/scan-results
 * @desc    Save a pet scan result
 * @access  Private
 */
export const saveScanResult = async (req, res, next) => {
    try {
        const { image_url, predicted_breed, confidence_score, pet_id } = req.body;
        
        const scanResult = await ScanResult.create({
            user_id: req.user.id,
            pet_id: pet_id || null,
            image_url,
            predicted_breed,
            confidence_score
        });

        res.status(201).json({
            success: true,
            data: scanResult
        });
    } catch (err) {
        next(err);
    }
};
