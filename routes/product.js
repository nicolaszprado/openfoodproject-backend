const express = require('express');
const router = express.Router();
const { fetchProductData } = require('../services/openFoodService');

router.get('/:barcode', async (req, res) => {
  try {
    const barcode = req.params.barcode;
    const productData = await fetchProductData(barcode);

    if (!productData) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json(productData);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

module.exports = router;
