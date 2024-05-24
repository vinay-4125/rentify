import express from 'express';

import {
    addProperty,
    getSellerProperties,
    updateProperty,
    deleteProperty,
    getAllProperties,
  showInterest,
} from '../controllers/propertyControllers.js';

const router = express.Router();

router.post('/properties', addProperty);
router.get('/properties/seller/:sellerId', getSellerProperties);
router.put('/properties/:id', updateProperty);
router.delete('/properties/:id', deleteProperty);

router.get('/properties', getAllProperties);
router.get('/properties/interest/:id', showInterest);


export default router;
