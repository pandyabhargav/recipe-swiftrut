import express from 'express';
import { addFood, deleteFood, editFood, getFoods, getFoodById } from '../Controller/foodcontroler.js'; 

const router = express.Router();


router.post('/add', addFood);


router.get('/all', getFoods);


router.get('/:id', getFoodById); 


router.put('/edit/:id', editFood);


router.delete('/delete/:id', deleteFood); 

export default router;
