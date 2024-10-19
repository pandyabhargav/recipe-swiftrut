export const isAuthenticated = () => {
  const tokenExists = localStorage.getItem('token') !== null; 
  console.log('Is authenticated:', tokenExists); 
  return tokenExists;
};
