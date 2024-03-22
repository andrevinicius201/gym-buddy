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
import RegisterPage from './pages/GymActivation';
import LoginPage from './pages/Login';
import { AuthProvider } from './Context/AuthContext';
import StudentTrainingEdit from './pages/StudentTrainingEdit';


function PrivateRoute({ children, isPrivate }) {
 
  const { loading, authenticated } = useContext(Context);
  console.log("está autenticado? ", authenticated)

  if (loading) {
    return <p> Por favor, aguarde.. página em carregamento </p>;
  }

  if (isPrivate && !authenticated) {
    return <Navigate to="/register" />
  } else {
    return <>{children}</>
  }

}


export default function App() {

  return (
    <AuthProvider>
          <Menu/>
          <Router>
            <Routes>
                <Route exact path="/" element={<Home />} /> 

                <Route exact path="/register" element={<RegisterPage />} /> 
                <Route exact path="/login" element={<LoginPage />} /> 
                
                <Route
                  path="/exercises"
                  element={
                    <PrivateRoute isPrivate={false}>
                      <AllExercisesList/>
                    </PrivateRoute>
                  }
                />     
                <Route
                  path="/students"
                  element={
                    <PrivateRoute isPrivate={false}>
                      <StudentsList/>
                    </PrivateRoute>
                  }
                />  

                <Route
                  path="/students/:id"
                  element={
                    <PrivateRoute isPrivate={false}>
                      <StudentTrainingEdit />
                    </PrivateRoute>
                  }
                />
          </Routes> 
      
        </Router> 
    </AuthProvider>
  )
}



