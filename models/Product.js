import mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema({
  ingredient: { type: String, required: true },
  percent: { type: Number, required: true }
}, {_id: false});

const NutritionalInfoSchema = new mongoose.Schema({
  calories: { type: Number },
  protein: { type: Number },
  carbohydrates: { type: Number },
  fat: { type: Number },
  fiber: { type: Number },
  sodium: { type: Number }
}, {_id: false});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ean: { type: String, required: true, unique: true },
  description: { type: String },
  imageUrl: { type: String },
  restaurantName: { type: String },
  category: { type: String },
  ingredients: [IngredientSchema],
  allergens: [String],
  nutritionalInfo: NutritionalInfoSchema,
  isVegetarian: { type: Boolean, default: false },
  isVegan: { type: Boolean, default: false },
  isGlutenFree: { type: Boolean, default: false },
  isLactoseFree: { type: Boolean, default: false }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
