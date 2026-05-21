const stocksService = require('../services/stocksService');

const getAllStocks = (req, res) => {
    const { title } = req.query;
    const stocks = stocksService.findAll(title);
    res.json(stocks);
};

const getStockByText = (req, res) => {
    const searchQuery = req.params.search;

    if (!searchQuery) {
        return res.status(400).json({ error: 'Поисковый запрос не указан' });
    }

    // Вызываем метод, который сейчас добавим в сервис
    const stocks = stocksService.findByText(searchQuery);

    if (!stocks || stocks.length === 0) {
        return res.status(404).json({ error: 'Карточки не найдены' });
    }

    res.json(stocks);
};

const createStock = (req, res) => {
    const { src, title, text } = req.body;

    // Простая валидация
    if (!src || !title || !text) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
    }

    const newStock = stocksService.create({ src, title, text });
    res.status(201).json(newStock);
};

const updateStock = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedStock = stocksService.update(id, req.body);

    if (!updatedStock) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }

    res.json(updatedStock);
};

const deleteStock = (req, res) => {
    const id = parseInt(req.params.id);
    const success = stocksService.remove(id);

    if (!success) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }

    res.status(204).send(); // 204 No Content
};

const checkStockHead = (req, res) => {
    const id = parseInt(req.params.id);
    const stock = stocksService.findOne(id);

    if (!stock) {
        return res.sendStatus(404);
    }

    const responseData = JSON.stringify(stock);

    res.status(200)
       .set('Content-Type', 'application/json')
       .set('Content-Length', Buffer.byteLength(responseData))
       .set('ETag', `"${require('crypto').createHash('md5').update(responseData).digest('hex')}"`)
       .end();
};

module.exports = {
    getAllStocks,
    getStockByText,
    createStock,
    updateStock,
    deleteStock,
    checkStockHead
};
