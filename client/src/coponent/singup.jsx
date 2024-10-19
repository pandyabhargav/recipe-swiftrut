import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data being sent:', formData); 
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', formData);
      console.log('Signup response:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
      alert(`Error: ${error.response?.data.message || 'An error occurred'}`);
    }
  };

  return (
    <Container className="mt-3">
      <div className='d-flex flex-column justify-content-center pt-120 align-items-center'>
        <h2 className="mb-3">Signup</h2>
        <Form onSubmit={handleSubmit} style={{ width: '500px' }}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-2">
            Signup
          </Button>
          <p className="mt-2">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </Form>
      </div>
    </Container>
  );
};

export default Signup;
