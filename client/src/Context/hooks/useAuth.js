import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode' 

import {
  Navigate
} from "react-router-dom";


const api = axios.create({
  baseURL: 'http://localhost:8000',
})

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState(undefined);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin(formData){
    try {
      const { data: { token } } = await api.post('/auth/login', formData);
      // const tokenData = jwtDecode(token)
      localStorage.setItem('token', JSON.stringify(token));
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
      setRole(jwtDecode(token).role);
      alert("Usuário autenticado com sucesso! ")
    }
    catch(err) {
      alert("Usuário ou senha incorretos")
    }
    
  }
  

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUserRole');
    api.defaults.headers.Authorization = undefined;
  }
  
  return { authenticated, role, loading, handleLogin, handleLogout };
}
