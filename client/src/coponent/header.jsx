import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Button, Modal, Alert } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/food/all');
        setMeals(response.data);
      } catch (err) {
        setError('Error fetching meals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search for:', searchTerm);
  };

  const handleShowModal = (meal) => {
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMeal(null);
  };

  const handleDeleteMeal = async (mealId) => {
    try {
      await axios.delete(`http://localhost:3000/api/food/delete/${mealId}`);
      setMeals(meals.filter(meal => meal._id !== mealId));
      console.log('Deleted meal with ID:', mealId);
    } catch (err) {
      setError('Error deleting meal. Please try again later.');
    }
  };


  const filteredMeals = meals.filter(meal =>
    meal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <section className='bg-img'>
        <Container>
          <Row>
            <div className='col-12 d-flex justify-content-center align-items-center p-5'>
              <Form className="d-flex p-5" onSubmit={handleSearchSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Search 2M+ Recipes"
                  className="me-2 search rounded-pill"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Form>
            </div>
            <div className='col-12 d-flex justify-content-center mb-3'>
              <Link to="/addForm">
                <Button variant="success">+ Add Food</Button>
              </Link>
            </div>
          </Row>
        </Container>
      </section>

      <section className="section-meals">
        <Container>
          <Row>
            <div className="col-12 d-flex flex-wrap justify-content-center cards align-items-center p-5">
              {loading ? ( 
                <p>Loading meals...</p>
              ) : (
                filteredMeals.map((meal) => (
                  <Card className="meal-card shadow-sm col-3 m-2" key={meal._id}>
                    <Card.Img
                      variant="top"
                      src={meal.imageUrl} 
                      className="meal-img"
                      alt={meal.title}
                    />
                    <Card.Body>
                      <Card.Title>{meal.title}</Card.Title>
                      <Card.Text>{meal.description}</Card.Text>
                      <div className='d-flex justify-content-start'>
                        <Button variant="success" onClick={() => handleShowModal(meal)}>View</Button>
                        <Link to={`/edit/${meal._id}`} className="ms-2">
                          <Button variant="primary">Edit</Button>
                        </Link>
                        <Button
                          variant="danger"
                          className="ms-2"
                          onClick={() => handleDeleteMeal(meal._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))
              )}
            </div>
          </Row>
        </Container>
      </section>


      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedMeal?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMeal ? (
            <>
              <img src={selectedMeal.imageUrl} alt={selectedMeal.title} className="img-fluid mb-3" />
              <p>{selectedMeal.description}</p>
              <h5>Cooking Time: {selectedMeal.cookingTime} minutes</h5>
              <h5>Ingredients:</h5>
              <ul>
                {Array.isArray(selectedMeal.ingredients) && selectedMeal.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>No meal selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Header;
