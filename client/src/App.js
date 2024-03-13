import React, { useState, useEffect, useContext } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { Context } from './Context/AuthContext';

import AllExercisesList from "./components/AllExercisesList";
import StudentTrainingInfo from "./components/StudentTrainingInfo";
import RestrictPage from "./components/RestrictPage";
import Home from './components/Home';
import Menu from './components/Menu';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import { AuthProvider } from './Context/AuthContext';


function PrivateRoute({ children, isPrivate }) {
 
  const { loading, authenticated } = useContext(Context);

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
                    <PrivateRoute isPrivate={true}>
                      <AllExercisesList/>
                    </PrivateRoute>
                  }
                />     
                <Route
                  path="/students"
                  element={
                    <PrivateRoute isPrivate={true}>
                      <StudentTrainingInfo/>
                    </PrivateRoute>
                  }
                />  

                <Route
                  path="/private"
                  element={
                    <PrivateRoute isPrivate={true}>
                      <RestrictPage/>
                    </PrivateRoute>
                  }
                />

          </Routes> 
      
        </Router> 
    </AuthProvider>
  )
}



