const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

router.get('/lastPurchase', purchaseController.getLastPurchase);
router.get('/purchases', purchaseController.getPurchases);

module.exports = router;
