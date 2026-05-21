const express = require('express');
const router = express.Router();
const stocksController = require('../controllers/stocksController');

// Определение маршрутов
router.get('/', stocksController.getAllStocks);
router.get('/search/:search', stocksController.getStockByText);
router.post('/', stocksController.createStock);
router.patch('/:id', stocksController.updateStock);
router.delete('/:id', stocksController.deleteStock);
router.head('/:id', stocksController.checkStockHead);

module.exports = router;
