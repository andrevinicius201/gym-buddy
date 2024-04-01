import React, { useEffect, useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import AllExercisesList from "./pages/ExercisesList";
import StudentsList from "./pages/StudentsList";
import InstructorList from "./pages/InstructorList";
import Home from './pages/Home';
import Menu from './components/Menu';
import RegisterPage from './pages/GymActivation';
import LoginPage from './pages/Login';
import StudentTrainingEdit from './pages/StudentTrainingEdit';

import { useAuthContext } from './hooks/useAuthContext'
import { AuthContextProvider } from './Context/AuthContext'

function getCurrentPageId(){
  const paths = window
  .location
  .pathname
  .split("/")
  .filter(path => path !== "");
  return paths[paths.length - 1]
}

function checkPermissionForUser(user, requiredAccess){

  if(requiredAccess == "instructorOrHigher"){
    if (user && user.user_role != 'student'){
      return true
    } else {
      return false
    }
  }

  if(requiredAccess == "granularIdBased"){
    
  let currentPageId = getCurrentPageId()
    if(currentPageId == user.userId){
      return true
    } else {
      return false
    }
  } 
}

function RequiredPrivilegedAccess({ children, requiredAccess }) {

  const {user, loading} = useAuthContext()

  if(loading){
    return <h1> Please wait.. loading data</h1>
  }

  let userIsAllowed = user && user.user_role != 'student' ? true : checkPermissionForUser(user, requiredAccess)
  if(userIsAllowed){
    return <>
      {children}
    </>  
  } else {
    return <Navigate to="/login" />
  }
  
}

export default function App() {

  return (
    <AuthContextProvider>
          <Menu/>
          <Router>
            <Routes>
                
                <Route 
                  exact 
                  path="/" 
                  element={
                    <RequiredPrivilegedAccess requiredAccess="instructorOrHigher">
                      <Home/>
                    </RequiredPrivilegedAccess>
                  }
                /> 

                <Route
                  path="/exercises"
                  element={
                    <RequiredPrivilegedAccess requiredAccess="instructorOrHigher">
                      <AllExercisesList/>
                    </RequiredPrivilegedAccess>
                  }
                />

                <Route
                  path="/students"
                  element={
                    <RequiredPrivilegedAccess requiredAccess="instructorOrHigher">
                      <StudentsList/>
                    </RequiredPrivilegedAccess>
                  }
                />

                <Route
                  path="/instructors"
                  element={
                    <RequiredPrivilegedAccess requiredAccess="instructorOrHigher">
                      <InstructorList/>
                    </RequiredPrivilegedAccess>
                  }
                />

                <Route
                  path="/students/:id"
                  element={
                    <RequiredPrivilegedAccess requiredAccess="granularIdBased">
                      <StudentTrainingEdit />
                    </RequiredPrivilegedAccess>
                  }
                />

                <Route exact path="/register" element={<RegisterPage />} />
                <Route exact path="/login" element={<LoginPage />} /> 
                
              
          </Routes> 
        </Router> 
    </AuthContextProvider>
  )
}



