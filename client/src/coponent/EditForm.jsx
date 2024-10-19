import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

function EditFoodForm() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [foodData, setFoodData] = useState({
    title: '',
    ingredients: '',
    description: '',
    cookingTime: '',
    imageUrl: '',
  });
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchFoodData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/food/${id}`);
            
            const ingredients = Array.isArray(response.data.ingredients) 
                ? response.data.ingredients.join(', ') 
                : response.data.ingredients;
            setFoodData({ ...response.data, ingredients }); 
        } catch (err) {
            console.error('Error fetching food data:', err);
            setError('Error fetching food data.');
        }
    };

    fetchFoodData();
}, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const ingredientsArray = typeof foodData.ingredients === 'string' 
        ? foodData.ingredients.split(',').map(ingredient => ingredient.trim()) 
        : [];


    const foodDataToSubmit = {
        ...foodData,
        ingredients: ingredientsArray,
    };

    try {
        await axios.put(`http://localhost:3000/api/food/edit/${id}`, foodDataToSubmit);
        navigate('/'); 
    } catch (err) {
        console.error('Error updating food data:', err);
        setError('Error updating food data: ' + err.response.data.error);
    }
};

  return (
    <Container className='d-flex justify-content-center'>
      <div className='col-6'>
        <h2 className="my-4">Edit Recipe</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={foodData.title}
              onChange={handleChange}
              placeholder="Enter recipe title"
              required
            />
          </Form.Group>

          
          <Form.Group controlId="formIngredients" className="mb-3">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="ingredients"
              value={foodData.ingredients}
              onChange={handleChange}
              placeholder="Enter ingredients (separated by commas)"
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="description"
              value={foodData.description}
              onChange={handleChange}
              placeholder="Enter cooking instructions"
              required
            />
          </Form.Group>

          <Form.Group controlId="formCookingTime" className="mb-3">
            <Form.Label>Cooking Time (in minutes)</Form.Label>
            <Form.Control
              type="number"
              name="cookingTime"
              value={foodData.cookingTime}
              onChange={handleChange}
              placeholder="Enter cooking time"
              required
            />
          </Form.Group>

          <Form.Group controlId="formImageUrl" className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              value={foodData.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default EditFoodForm;
