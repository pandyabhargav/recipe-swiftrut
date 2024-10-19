import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data being sent:', formData); 
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', formData);
      console.log('Login response:', response.data); 
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/'); 
      } else {
        setError('No token received'); 
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      setError(error.response?.data.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Container className="mt-3">
      <div className='d-flex flex-column justify-content-center pt-120 align-items-center'>
        <h2 className="mb-3">Login</h2>
        <Form onSubmit={handleSubmit} style={{ width: '500px' }}>
          {error && <Alert variant="danger">{error}</Alert>}
          
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
            Login
          </Button>
          <p className="mt-2">
            Don't have an account? <Link to="/signup">Signup here</Link>
          </p>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
