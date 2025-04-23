const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/product');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
