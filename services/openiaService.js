import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function buildNutritionInsights(product) {
  if (!product) {
    return '';
  }

  const ingredientList =
    product.ingredients?.map((item) => item.ingredient).join(', ') || 'Nao informado';
  const nutrition = product.nutritionalInfo || {};

  const prompt = 
  `
Nome: ${product.name}
Categoria: ${product.category}
Ingredientes: ${ingredientList}
Nutrientes (por 100g): calorias ${nutrition.calories}, proteinas ${nutrition.protein}, carboidratos ${nutrition.carbohydrates}, gorduras ${nutrition.fat}, fibras ${nutrition.fiber}, sodio ${nutrition.sodium}.
Explique rapidamente se o produto parece saudavel, destaque pontos de atencao
Alem disso gere uma receita de algo simples se possivel, utilizando o produto").
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-nano', //NÃO TROCAR O MODELO!!!
      messages: [
        { role: 'system', content: 'Voce e um nutricionista.' },
        { role: 'user', content: prompt.trim() },
      ],
    });

    const text = completion.choices?.[0]?.message?.content?.trim();
    return text || '';
  } catch (error) {
    const detail = error?.response?.data ?? error?.message ?? error;
    console.error('Erro ao gerar insights nutricionais:', detail);
    return '';
  }
}
