import React, { useState, useEffect, useContext } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { Context } from './Context/AuthContext';

import AllExercisesList from "./pages/ExercisesList";
import StudentsList from "./pages/StudentsList";
import Home from './pages/Home';
import Menu from './components/Menu';
import ActivationCodeCreationForm from './components/ActivationCodeCreationForm';
import RegisterPage from './pages/GymActivation';
import LoginPage from './pages/Login';
import { AuthProvider } from './Context/AuthContext';
import StudentTrainingEdit from './pages/StudentTrainingEdit';
import { jwtDecode } from 'jwt-decode' 


function PrivateRoute({ children, isPrivate }) {
 
  const { loading, authenticated, role } = useContext(Context);

  if (loading) {
    return <p> Por favor, aguarde.. página em carregamento </p>;
  }

  if (isPrivate && !authenticated) {
    return <Navigate to="/login" />
  } else {

    return <>{children}</>
  }

}


export default function App() {
  const userRole = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')).role : undefined
  localStorage.setItem('loggedUserRole', userRole)

  return (
    <AuthProvider>
          <Menu/>
          <Router>
            <Routes>
                <Route 
                  exact 
                  path="/" 
                  element={
                    <PrivateRoute isPrivate={true}>
                      <Home/>
                    </PrivateRoute>
                  }
                /> 

                <Route exact path="/register" element={<RegisterPage />} />

                <Route exact path="/login" element={<LoginPage />} /> 
                
                <Route
                  path="/exercises"
                  element={
                    <PrivateRoute isPrivate={true}>
                      <AllExercisesList/>
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/students"
                  element={
                    <PrivateRoute isPrivate={true}>
                      <StudentsList/>
                    </PrivateRoute>
                  }
                />  

                <Route
                  path="/students/:id"
                  element={
                    <PrivateRoute isPrivate={true}>
                      <StudentTrainingEdit />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/administration/registration-code-creation"
                  element={
                    <PrivateRoute isPrivate={true}>
                      <ActivationCodeCreationForm />
                    </PrivateRoute>
                  }
                />
          </Routes> 
        </Router> 
    </AuthProvider>
  )
}



