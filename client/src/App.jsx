import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import './App.css';
import Header from './coponent/header'; 
import AddFoodForm from './coponent/AddForm'; 
import EditForm from './coponent/EditForm';  
import Signup from './coponent/singup';
import Login from './coponent/login';
import { isAuthenticated } from './utils/Auth';

function App() {
  return (
    <Router>
    <Routes>
   
      <Route path="/" element={isAuthenticated() ? <Header /> : <Navigate to="/login" />} />
      
      
      <Route path="/addForm" element={isAuthenticated() ? <AddFoodForm /> : <Navigate to="/login" />} />
      <Route path="/edit/:id" element={isAuthenticated() ? <EditForm /> : <Navigate to="/login" />} />      
      
      
      <Route path="/signup" element={<Signup />} /> 
      <Route path="/login" element={<Login />} /> 

     
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
  );
}

export default App;
