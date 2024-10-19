
import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  imageUrl: { type: String }, 
  ingredients: { type: [String], required: true }, 
});

const Food = mongoose.model('Food', foodSchema);
export default Food;
