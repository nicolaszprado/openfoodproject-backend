// services/openFoodService.js
import axios from 'axios';

export async function fetchProductData(barcode) {
  try {
    console.log(`[OpenFoodService] Tentando buscar produto: ${barcode}`);
    const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);

    console.log(`[OpenFoodService] Resposta da API Open Food Facts (status: ${response.status}):`, response.data);

    const productOff = response.data.product;
    const status = response.data.status;

    if (status === 0 && response.data.status_verbose === "product not found") {
      console.log(`[OpenFoodService] Produto ${barcode} não encontrado na base de dados do Open Food Facts.`);
      return null;
    }

    if (!productOff) {
      console.log(`[OpenFoodService] Dados do produto (response.data.product) estão vazios para ${barcode}.`);
      return null;
    }

    // --- Mapeando dados do Open Food Facts para sua interface Product ---
    const mappedProduct = {
      // Campos obrigatórios da sua interface
      id: barcode, // Usando o barcode como ID
      name: productOff.product_name || 'Produto Desconhecido', // Fallback para nome
      ean: barcode, // O EAN é o próprio barcode
      description: productOff.generic_name || productOff.ingredients_text || 'Sem descrição disponível.',
      price: 0.00, // OFF não fornece preço, use 0.00 ou null
      imageUrl: productOff.image_url || 'https://via.placeholder.com/150', // Imagem ou placeholder
      restaurantName: productOff.brands || 'Marca Desconhecida',
      category: productOff.categories || 'Desconhecida', // OFF categories can be complex, you might parse this
      rating: 0, // OFF não fornece rating
      reviewCount: 0, // OFF não fornece reviewCount
      
      // Converte a string de ingredientes para um array (se existir)
      ingredients: productOff.ingredients_text ? 
                   productOff.ingredients_text.split(',').map(item => item.trim()) : 
                   [],
      
      // Alérgenos são um pouco mais complexos no OFF, muitas vezes em `allergens_from_ingredients`
      // ou apenas em `ingredients_text`. Aqui, um placeholder.
      allergens: productOff.allergens_from_ingredients ? 
                 productOff.allergens_from_ingredients.split(',').map(item => item.trim()) : 
                 [],
      
      // Mapeando dados nutricionais
      nutritionalInfo: {
        calories: productOff.nutriments?.energy_kcal || 0,
        protein: productOff.nutriments?.proteins || 0,
        carbohydrates: productOff.nutriments?.carbohydrates || 0,
        fat: productOff.nutriments?.fat || 0,
        fiber: productOff.nutriments?.fiber || 0,
        sodium: productOff.nutriments?.sodium || 0, // Sodium is often in mg, you might want to convert to g
        // Add other nutritional fields if available in OFF and in your interface
      },
      
      // Reviews não são fornecidas pelo OFF, então um array vazio
      reviews: [],
      
      // Badges de dieta - OFF fornece tags, mas não booleans diretos.
      // Você precisaria de lógica para mapear tags para esses booleans.
      isVegetarian: productOff.labels_tags?.includes('en:vegetarian') || false,
      isVegan: productOff.labels_tags?.includes('en:vegan') || false,
      isGlutenFree: productOff.ingredients_analysis_tags?.includes('en:gluten-free') || false,
      isLactoseFree: productOff.ingredients_analysis_tags?.includes('en:lactose-free') || false,
    };

    console.log(`[OpenFoodService] Produto ${mappedProduct.name} encontrado e mapeado.`);
    return mappedProduct; // Retorna o objeto mapeado
  } catch (err) {
    if (axios.isAxiosError(err)) {
        console.error(`[OpenFoodService] Erro Axios ao buscar produto:`, err.message);
        if (err.response) {
            console.error(`[OpenFoodService] Resposta da API OFF: ${err.response.status} -`, err.response.data);
        } else if (err.request) {
            console.error(`[OpenFoodService] Nenhuma resposta recebida da API OFF.`);
        }
    } else {
        console.error(`[OpenFoodService] Erro inesperado:`, err);
    }
    return null;
  }
}