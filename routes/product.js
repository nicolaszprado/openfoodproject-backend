import express from 'express';
import { fetchProductData } from '../services/openFoodService.js';
import { buildNutritionInsights } from '../services/openiaService.js';

const router = express.Router();

router.get('/:barcode', async (req, res) => {
  try {
    const barcode = req.params.barcode;
    const productData = await fetchProductData(barcode);

    if (!productData) {
      return res.status(404).json({ message: 'Produto nao encontrado' });
    }

    const aiInsights = await buildNutritionInsights(productData);
    res.json({ product: productData, aiInsights });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

export default router;
