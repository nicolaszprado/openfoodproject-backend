import express from 'express';
import Favorite from '../models/Favorite.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ error: 'userId e productId são obrigatórios' });
    }

    const existing = await Favorite.findOne({ user: userId, product: productId });
    if (existing) {
      return res.status(409).json({ message: 'Produto já esta nos favoritos do usuário' });
    }

    const favorite = new Favorite({ user: userId, product: productId });
    await favorite.save();

    res.status(201).json({ message: 'Produto adicionado aos favoritos', favorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const favorites = await Favorite.find({ user: userId }).populate('product');
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const result = await Favorite.findOneAndDelete({
      user: userId,
      product: productId
    });

    if (!result) {
      return res.status(404).json({ message: 'Favorito não encontrado' });
    }

    res.status(200).json({ message: 'Favorito removido com sucesso' });
  } catch (error) {
    console.error('Erro removendo favorito:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


export default router;
