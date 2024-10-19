import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

function AddFoodForm() {
  const navigate = useNavigate(); 
  const [foodData, setFoodData] = useState({
    title: '',
    ingredients: '',
    description: '', 
    cookingTime: '',
    imageUrl: '',
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    
    const ingredientsArray = foodData.ingredients.split(',').map(ingredient => ingredient.trim());
  
   
    const foodDataToSubmit = {
      ...foodData,
      ingredients: ingredientsArray,
    };
  
    fetch('http://localhost:3000/api/food/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodDataToSubmit), 
    })
      .then((response) => {
        console.log('Response status:', response.status); 
        return response.json();
      })
      .then((data) => {
        console.log('Food Data Submitted:', data);
        console.log('Submitting Food Data:', foodDataToSubmit);
        if (data && data.message === 'Recipe added successfully!') {
          navigate('/'); 
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  
  return (
    <Container className='d-flex justify-content-center'>
      <div className='col-6'>
        <h2 className="my-4">Add New Recipe</h2>
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


          <Form.Group controlId="formdescription" className="mb-3">
            <Form.Label>description</Form.Label>
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
            Add Recipe
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default AddFoodForm;
