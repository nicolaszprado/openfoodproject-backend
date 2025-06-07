import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import db from './config/dbConnect.js';
import productRoutes from './routes/product.js';
import authRoutes from './routes/auth.js';
import protect from './services/authService.js';

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/private', protect, (req, res) => {
  res.json({ message: `Olá, usuário com ID ${req.user._id}` }); //Rota de teste para checar funcionamento do JWT
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});