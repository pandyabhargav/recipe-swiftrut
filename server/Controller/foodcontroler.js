import Food from '../models/foodscema.js';


export const addFood = async (req, res) => {
    console.log('Incoming data:', req.body);
    try {
        const newFood = new Food(req.body);
        await newFood.save();
        res.status(201).json({ message: 'Recipe added successfully!', food: newFood });
    } catch (error) {
        console.error('Error saving food:', error);
        res.status(400).json({ error: error.message || 'An error occurred while adding the recipe' });
    }
};


export const getFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id); 
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.json(food);
    } catch (err) {
        console.error('Error fetching food by ID:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


export const editFood = async (req, res) => {
    const { id } = req.params;
    console.log('Incoming data for editing:', req.body); 
    try {
        const updatedFood = await Food.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedFood) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe updated successfully!', food: updatedFood });
    } catch (error) {
        console.error('Error updating food:', error); 
        res.status(400).json({ error: error.message });
    }
};


export const deleteFood = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFood = await Food.findByIdAndDelete(id); 
        if (!deletedFood) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
