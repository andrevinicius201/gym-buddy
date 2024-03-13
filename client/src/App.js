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
import Menu from './components/Menu'
import { AuthProvider } from './Context/AuthContext';


function PrivateRoute({ children, isPrivate }) {
 
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return <p> Por favor, aguarde.. página em carregamento </p>;
  }

  if (isPrivate && !authenticated) {
    return <Navigate to="/" />
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
                <Route exact path="/exercises" element={<AllExercisesList />} />  
                <Route path="/students" element={<StudentTrainingInfo />} />        
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



