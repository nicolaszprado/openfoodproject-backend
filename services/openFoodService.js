// const axios = require('axios');
import axios from 'axios';

export async function fetchProductData(barcode) {
  try {
    const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const product = response.data.product;

    if (!product) return null;

   
    return {
      nome: product.product_name,
      marcas: product.brands,
      ingredientes: product.ingredients_text,
      calorias: product.nutriments?.energy_kcal,
      gordura: product.nutriments?.fat,
      imagem: product.image_url
    };
  } catch (err) {
    console.error('Erro ao buscar produto:', err.message);
    return null;
  }
}

// module.exports = { fetchProductData };
